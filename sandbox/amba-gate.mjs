import { generateKeyPairSync, randomBytes } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildOidcAuthorization, completeOidcAuthorization } from '@zeko/amba/protocol/oidc';
import { buildAgentPassport, proposeMission, approveMission, enforceCheckpoint } from '@zeko/amba/protocol/missions';
import { buildMissionPolicy, buildMissionCapability, verifyCapability } from '@zeko/amba/protocol/capabilities';
import { buildBoundaryEvent, verifyBoundaryEvent, ED25519_HOLDER_PROOF_SCHEME } from '@zeko/amba/protocol/boundary-events';
import { sha256Hex } from '@zeko/amba/protocol/digest';

export const digest = sha256Hex;
export function configureAmba(issuer) {
  const directory = mkdtempSync(join(tmpdir(), 'aaif-amba-'));
  const settings = {
    MISSION_AUTH_PROFILE: 'portable', MISSION_SETTLEMENT_PROFILE: 'none', DEMO_MODE: 'false',
    MISSION_AUTHORITY_PRIVATE_JWK: JSON.stringify(generateKeyPairSync('ec', { namedCurve: 'P-256' }).privateKey.export({ format: 'jwk' })),
    ZK_OAUTH_ISSUER_SECRET: randomBytes(32).toString('hex'),
    MISSION_STATE_PATH: join(directory, 'missions.json'), REVOCATION_STATE_PATH: join(directory, 'revocations.json'),
    AGENT_MAPPINGS_JSON: JSON.stringify([{ subjectKey: `aaif-sandbox:${issuer}:fixture-user`, agentId: 'sandbox-agent', organization: 'sandbox-tenant', represents: { type: 'organization', id: 'sandbox-tenant' } }])
  };
  const previous = Object.fromEntries(Object.keys(settings).map(key => [key, process.env[key]]));
  Object.assign(process.env, settings);
  return () => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    rmSync(directory, { recursive: true, force: true });
  };
}

export async function loginViaAmba({ base, idpClient, sessions, getCodeToken }) {
  const config = {
    provider: 'aaif-sandbox', configured: true, issuer: `${base}/idp/`,
    clientId: idpClient.id, clientSecret: idpClient.authentication.secret,
    redirectUri: `${base}/callback`, scope: 'openid quota:reserve',
    discoveryUrl: `${base}/idp/.well-known/openid-configuration`
  };
  const start = await buildOidcAuthorization(config, sessions);
  const response = await fetch(start.authorizationUrl, { redirect: 'manual' });
  if (response.status !== 302) throw new Error('sandbox SSO failed');
  const callback = new URL(response.headers.get('location'));
  const code = callback.searchParams.get('code');
  const state = callback.searchParams.get('state');
  if (state !== start.state) throw new Error('sandbox OIDC state mismatch');
  const identity = await completeOidcAuthorization({ code, state }, sessions);
  return { identity, idToken: getCodeToken(code) };
}

export function issueMission(identity, domain, { denied = false, ttlMs = 300000 } = {}) {
  const holder = generateKeyPairSync('ed25519');
  const holderKeyCommitment = sha256Hex(holder.publicKey.export({ format: 'jwk' }));
  const passport = buildAgentPassport({ identityAttestation: identity.identityAttestation, holderKeyCommitment, domain });
  const action = 'external_app.side_effect';
  const mission = proposeMission({
    agentId: passport.agentId, task: 'Reserve a bounded shared resource', datasetId: 'shared-quota', operation: 'reserve',
    allowedDomains: [domain], allowedTools: denied ? ['page.read'] : [action], allowedScopes: ['quota:reserve'],
    allowedRails: [], maxSpendUsd: '100.00', ttlMs
  });
  const approval = approveMission({ missionId: mission.missionId, approverAttestation: identity.identityAttestation });
  const policy = buildMissionPolicy({ ...mission, missionId: mission.missionId, allowedActions: mission.allowedTools, maxSpendUsd: '100.00' });
  const capability = buildMissionCapability({
    principalHash: sha256Hex({ issuer: identity.normalizedClaims.issuer, subject: identity.normalizedClaims.subject, salt: randomBytes(16).toString('hex') }),
    authCommitment: identity.authCommitment, identityAttestationHash: identity.identityAttestation.attestationHash,
    approvalHash: approval.approvalHash, agentId: passport.agentId, holderKeyCommitment, missionId: mission.missionId,
    policyHash: policy.policyHash, allowedDomains: [domain], allowedActions: mission.allowedTools,
    dataScopes: ['quota:reserve'], maxSpendUsd: '100.00', expiresAt: mission.expiresAt,
    nullifierCommitment: sha256Hex(randomBytes(32).toString('hex'))
  });
  return { holder, holderKeyCommitment, identity, passport, mission, approval, policy, capability, revoked: false, domain };
}

export function prepareAction(context, { units, actionId, domain = context.domain, wrongHolder = false }) {
  const action = 'external_app.side_effect';
  const event = buildBoundaryEvent({
    missionIdHash: context.capability.missionIdHash, capabilityHash: context.capability.capabilityHash,
    policyHash: context.policy.policyHash, action, actionHash: sha256Hex({ units, actionId, domain }),
    targetDomain: domain, resource: 'shared-quota', idempotencyKey: actionId,
    expiresAt: context.capability.expiresAt,
    holder: { scheme: ED25519_HOLDER_PROOF_SCHEME, privateKey: wrongHolder ? generateKeyPairSync('ed25519').privateKey : context.holder.privateKey }
  });
  return { units, actionId, missionId: context.mission.missionId, event };
}

export function checkMission(context, access, input) {
  if (!context || context.revoked || access.sub !== context.identity.normalizedClaims.subject ||
      access.tenant !== context.identity.normalizedClaims.organization) return false;
  if (!Number.isSafeInteger(input.units) || input.units <= 0 || input.units > 100 ||
      input.event?.actionHash !== sha256Hex({ units: input.units, actionId: input.actionId, domain: context.domain }) ||
      input.event?.idempotencyKey !== input.actionId || input.event?.holderKeyCommitment !== context.holderKeyCommitment) return false;
  if (!verifyCapability(context.capability).valid) return false;
  const valid = verifyBoundaryEvent(input.event, {
    verifierMode: 'production_strict', requireStrongHolderProof: true,
    missionIdHash: context.capability.missionIdHash, capabilityHash: context.capability.capabilityHash,
    policyHash: context.policy.policyHash, allowedActions: context.capability.allowedActions,
    allowedDomainHashes: [sha256Hex(context.domain)]
  });
  return valid.valid;
}

export function consumeMission(context, input) {
  return enforceCheckpoint({
    approval: context.approval, checkpoint: 'before_external_side_effect',
    context: {
      agentId: context.passport.agentId, datasetId: 'shared-quota', operation: 'reserve',
      targetDomain: context.domain, action: 'external_app.side_effect', scope: 'quota:reserve',
      missionExecutionId: context.mission.missionId, idempotencyKey: input.actionId, spendUsd: String(input.units)
    }
  }).ok;
}
