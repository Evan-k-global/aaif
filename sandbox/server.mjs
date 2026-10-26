import https from 'node:https';
import { readFileSync } from 'node:fs';
import { randomBytes, createHash } from 'node:crypto';
import { generateKeyPair, exportJWK, SignJWT, jwtVerify, createLocalJWKSet } from 'jose';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { z } from 'zod';
import { exchangeIdentityForAccess } from '../integrations/id-jag/client.mjs';
import { discoverEnterpriseAccess } from '../integrations/id-jag/discovery.mjs';
import { configureAmba, loginViaAmba, issueMission, prepareAction, checkMission, consumeMission, digest } from './amba-gate.mjs';

const JAG = 'urn:ietf:params:oauth:token-type:id-jag';
const ID = 'urn:ietf:params:oauth:token-type:id_token';
const PROFILE = 'urn:ietf:params:oauth:grant-profile:id-jag';
const id = () => randomBytes(20).toString('hex');
const now = () => Math.floor(Date.now() / 1000);
function send(res, status, data, headers = {}) {
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers });
  res.end(JSON.stringify(data));
}
async function body(req) {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 1000000) throw new Error('body too large'); }
  return raw;
}

export async function startSandbox({ mutation = 'none', proofBackend = null, domain = 'tck-domain-a', initialQuota = 100 } = {}) {
  const idpKeys = await generateKeyPair('RS256', { extractable: true });
  const asKeys = await generateKeyPair('RS256', { extractable: true });
  const idpJwk = { ...await exportJWK(idpKeys.publicKey), kid: 'sandbox-idp', alg: 'RS256', use: 'sig' };
  const asJwk = { ...await exportJWK(asKeys.publicKey), kid: 'sandbox-as', alg: 'RS256', use: 'sig' };
  const idpSet = createLocalJWKSet({ keys: [idpJwk] });
  const asSet = createLocalJWKSet({ keys: [asJwk] });
  const codes = new Map(), codeTokens = new Map(), sessions = new Map(), missions = new Map(), usedGrants = new Set();
  const clients = new Set();
  const clientSecrets = { 'idp-client': id(), 'resource-client': id(), 'idp-client-b': id(), 'resource-client-b': id() };
  const state = { remaining: initialQuota, version: 0, accepted: 0, rejected: 0, effects: 0, effectAttempts: 0, receipts: [], usedActions: new Set(), verifierEnabled: true };
  let base, restoreAmba, queue = Promise.resolve();
  async function mint(keys, kid, type, payload, issuer, audience, expiry = now() + 300) {
    return new SignJWT(payload).setProtectedHeader({ alg: 'RS256', kid, typ: type }).setIssuer(issuer)
      .setAudience(audience).setIssuedAt().setExpirationTime(expiry).setJti(id()).sign(keys.privateKey);
  }
  async function reserve(access, input) {
    const previous = queue;
    let unlock; queue = new Promise(r => { unlock = r; });
    await previous;
    try {
      const context = missions.get(input.missionId);
      if (!checkMission(context, access, input)) return { ok: false, rejectedAt: 'mission-gate' };
      if (state.usedActions.has(input.actionId) || input.units > state.remaining) return { ok: false, rejectedAt: 'shared-state' };
      const request = { before: state.remaining, units: input.units, version: state.version, domain, action: digest({ mission: input.missionId, actionId: input.actionId, event: input.event.eventHash }) };
      let proof;
      if (proofBackend) {
        if (!state.verifierEnabled) return { ok: false, rejectedAt: 'proof-verifier' };
        if (input.offeredVerificationKeyHash !== undefined && input.offeredVerificationKeyHash !== proofBackend.verificationKey.hash.toString()) return { ok: false, rejectedAt: 'proof-verifier' };
        proof = input.providedProof ?? await proofBackend.prove(request);
        if (!(await proofBackend.check(proof, request))) return { ok: false, rejectedAt: 'proof-verifier' };
      }
      if (!consumeMission(context, input)) return { ok: false, rejectedAt: 'mission-gate' };
      // This local single-writer state authority is explicit, not Ethereum settlement or a core sequencer.
      state.remaining -= input.units; state.version++; state.accepted++; state.usedActions.add(input.actionId);
      state.effectAttempts++;
      if (input.effectResponse !== 'disconnect-after-dispatch') state.effects++;
      const receipt = { domain, actionCommitment: request.action, version: state.version, remaining: state.remaining,
        outcome: input.effectResponse === 'disconnect-after-dispatch' ? 'unknown' : 'accepted',
        evidence: proofBackend ? 'local-o1js-application-proof' : 'sandbox-transactional-state',
        ...(proof ? { proof, statement: request } : {}) };
      state.receipts.push(receipt);
      return { ok: true, receipt };
    } finally { unlock(); }
  }

  const server = https.createServer({ key: readFileSync('.cache/tls/key.pem'), cert: readFileSync('.cache/tls/cert.pem') }, async (req, res) => {
    try {
      const url = new URL(req.url, base);
      if (req.method === 'GET' && url.pathname === '/idp/.well-known/openid-configuration') return send(res, 200, {
        issuer: `${base}/idp/`, authorization_endpoint: `${base}/idp/authorize`, token_endpoint: `${base}/idp/token`,
        jwks_uri: `${base}/idp/jwks`, response_types_supported: ['code'], subject_types_supported: ['public'],
        id_token_signing_alg_values_supported: ['RS256'], code_challenge_methods_supported: ['S256'],
        grant_types_supported: ['authorization_code', 'urn:ietf:params:oauth:grant-type:token-exchange'],
        token_endpoint_auth_methods_supported: ['client_secret_post']
      });
      if (req.method === 'GET' && url.pathname === '/idp/jwks') return send(res, 200, { keys: [idpJwk] });
      if (req.method === 'GET' && url.pathname === '/as/jwks') return send(res, 200, { keys: [asJwk] });
      if (req.method === 'GET' && url.pathname === '/.well-known/oauth-authorization-server/as') return send(res, 200, {
        issuer: `${base}/as/`, token_endpoint: `${base}/as/token`, jwks_uri: `${base}/as/jwks`,
        authorization_endpoint: `${base}/idp/authorize`, authorization_grant_profiles_supported: mutation === 'metadata-missing-idjag' ? [] : [PROFILE],
        grant_types_supported: ['urn:ietf:params:oauth:grant-type:jwt-bearer'], token_endpoint_auth_methods_supported: ['client_secret_post'],
        response_types_supported: ['code']
      });
      if (req.method === 'GET' && url.pathname === '/.well-known/oauth-protected-resource/mcp') return send(res, 200, {
        resource: `${base}/mcp`, authorization_servers: [`${base}/as/`], scopes_supported: ['quota:reserve'], bearer_methods_supported: ['header']
      });
      if (req.method === 'GET' && url.pathname === '/idp/authorize') {
        const q = url.searchParams;
        if (!['idp-client', 'idp-client-b'].includes(q.get('client_id')) || q.get('redirect_uri') !== `${base}/callback` ||
            q.get('response_type') !== 'code' || q.get('code_challenge_method') !== 'S256' || !q.get('code_challenge') || !q.get('state') || !q.get('nonce')) return send(res, 400, { error: 'invalid_request' });
        const code = id(); codes.set(code, Object.fromEntries(q));
        const location = new URL(`${base}/callback`); location.searchParams.set('code', code); location.searchParams.set('state', q.get('state'));
        res.writeHead(302, { location: location.href, 'cache-control': 'no-store' }); return res.end();
      }
      if (req.method === 'POST' && ['/idp/token', '/as/token'].includes(url.pathname)) {
        const form = new URLSearchParams(await body(req));
        const client = form.get('client_id');
        const allowed = url.pathname === '/idp/token' ? ['idp-client', 'idp-client-b'] : ['resource-client', 'resource-client-b'];
        if (!allowed.includes(client) || form.get('client_secret') !== clientSecrets[client]) return send(res, 401, { error: 'invalid_client' });
        if (url.pathname === '/idp/token') {
          if (form.get('grant_type') === 'authorization_code') {
            const code = form.get('code'), saved = codes.get(code); codes.delete(code);
            if (!saved || saved.client_id !== client || saved.redirect_uri !== form.get('redirect_uri') ||
                createHash('sha256').update(form.get('code_verifier') ?? '').digest('base64url') !== saved.code_challenge) return send(res, 400, { error: 'invalid_grant' });
            const token = await mint(idpKeys, 'sandbox-idp', 'JWT', { sub: 'fixture-user', nonce: mutation === 'oidc-nonce-mismatch' ? 'wrong-nonce' : saved.nonce, scope: 'quota:reserve', tenant: 'sandbox-tenant', organization: 'sandbox-tenant', max_spend_usd: '100.00' }, `${base}/idp/`, client);
            codeTokens.set(code, token);
            return send(res, 200, { id_token: token, access_token: id(), token_type: 'Bearer', expires_in: 300 });
          }
          if (form.get('grant_type') !== 'urn:ietf:params:oauth:grant-type:token-exchange' || form.get('requested_token_type') !== JAG || form.get('subject_token_type') !== ID) return send(res, 400, { error: 'invalid_request' });
          let source;
          try { source = (await jwtVerify(form.get('subject_token'), idpSet, { issuer: `${base}/idp/`, audience: client, algorithms: ['RS256'], typ: 'JWT' })).payload; } catch { return send(res, 400, { error: 'invalid_grant' }); }
          if (mutation === 'idp-policy-denied') return send(res, 400, { error: 'access_denied' });
          if (form.get('audience') !== `${base}/as/` || form.get('resource') !== `${base}/mcp` || source.sub !== 'fixture-user') return send(res, 400, { error: 'invalid_target' });
          const requestedScopes = (form.get('scope') ?? '').split(' ').filter(Boolean);
          if (requestedScopes.some(s => s !== 'quota:reserve')) return send(res, 400, { error: 'invalid_scope' });
          const mappedClient = client === 'idp-client-b' ? 'resource-client-b' : 'resource-client';
          const payload = { sub: source.sub, client_id: mutation === 'grant-bound-to-different-client' ? 'other-client' : mappedClient,
            resource: `${base}/mcp`, scope: requestedScopes.join(' '), tenant: mutation === 'cross-tenant-subject-collision' ? 'other-tenant' : 'sandbox-tenant' };
          if (mutation === 'grant-future-nbf') payload.nbf = now() + 600;
          let token = await mint(mutation === 'grant-bad-signature' ? asKeys : idpKeys, 'sandbox-idp', 'oauth-id-jag+jwt', payload,
            mutation === 'grant-from-untrusted-issuer' ? 'https://untrusted.example/' : `${base}/idp/`,
            mutation === 'grant-for-other-authorization-server' ? 'https://other-as.example/' : `${base}/as/`, mutation === 'expired-grant' ? now() - 1 : now() + 60);
          if (mutation === 'grant-none-algorithm') {
            const parts = token.split('.');
            token = Buffer.from(JSON.stringify({ alg: 'none', typ: 'oauth-id-jag+jwt' })).toString('base64url') + '.' + parts[1] + '.';
          }
          return send(res, 200, { access_token: token, issued_token_type: JAG, token_type: 'N_A', expires_in: 60 });
        }
        if (form.get('grant_type') !== 'urn:ietf:params:oauth:grant-type:jwt-bearer') return send(res, 400, { error: 'unsupported_grant_type' });
        let grant;
        try { grant = (await jwtVerify(form.get('assertion'), idpSet, { issuer: `${base}/idp/`, audience: `${base}/as/`, algorithms: ['RS256'], typ: 'oauth-id-jag+jwt', requiredClaims: ['sub','jti','iat','exp','client_id','resource','tenant'] })).payload; } catch { return send(res, 400, { error: 'invalid_grant' }); }
        if (grant.client_id !== client || grant.tenant !== 'sandbox-tenant' || grant.resource !== `${base}/mcp` || usedGrants.has(grant.jti) || mutation === 'resource-as-policy-denied') return send(res, 400, { error: 'invalid_grant' });
        usedGrants.add(grant.jti);
        const scope = mutation === 'access-granted-without-reserve-scope' ? '' : (grant.scope ?? '');
        const access = await mint(asKeys, 'sandbox-as', 'at+jwt', { sub: grant.sub, tenant: grant.tenant, client_id: client, scope }, `${base}/as/`, mutation === 'access-token-for-other-resource' ? `${base}/other` : `${base}/mcp`);
        return send(res, 200, { access_token: access, token_type: 'Bearer', expires_in: 300, scope, resource: `${base}/mcp` });
      }
      if (url.pathname === '/mcp') {
        let access;
        try {
          const token = /^Bearer (\S+)$/.exec(req.headers.authorization ?? '')?.[1];
          access = (await jwtVerify(token, asSet, { issuer: `${base}/as/`, audience: `${base}/mcp`, algorithms: ['RS256'], typ: 'at+jwt' })).payload;
          if (access.tenant !== 'sandbox-tenant' || !['resource-client','resource-client-b'].includes(access.client_id)) throw new Error('context');
        } catch { return send(res, 401, { error: 'invalid_token' }, { 'www-authenticate': `Bearer resource_metadata="${base}/.well-known/oauth-protected-resource/mcp"` }); }
        if (!(access.scope ?? '').split(' ').includes('quota:reserve')) return send(res, 403, { error: 'insufficient_scope' });
        if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
        const mcp = new McpServer({ name: 'zeko-aaif-sandbox', version: '0.1.0' });
        mcp.registerTool('reserve_resource', { description: 'Reserve sandbox quota under an AMBA mission', inputSchema: {
          units: z.number().int().positive().max(100), actionId: z.string().min(1), missionId: z.string(), event: z.unknown(),
          providedProof: z.unknown().optional(), offeredVerificationKeyHash: z.string().optional(), effectResponse: z.string().optional()
        } }, async input => {
          const result = await reserve(access, input);
          if (!result.ok) state.rejected++;
          return { content: [{ type: 'text', text: JSON.stringify(result) }], isError: !result.ok };
        });
        const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
        await mcp.connect(transport);
        res.on('close', () => { void transport.close(); void mcp.close(); });
        return await transport.handleRequest(req, res, JSON.parse(await body(req)));
      }
      send(res, 404, { error: 'not_found' });
    } catch { if (!res.headersSent) send(res, 500, { error: 'sandbox_error' }); else res.end(); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  base = `https://127.0.0.1:${server.address().port}`;
  restoreAmba = configureAmba(`${base}/idp/`);
  async function authorize({ secondClient = false, deniedMission = false, ttlMs } = {}) {
    const discovered = await discoverEnterpriseAccess({ resourceMetadataUrl: `${base}/.well-known/oauth-protected-resource/mcp`, resource: `${base}/mcp`, idpIssuer: `${base}/idp/`, resourceIssuer: `${base}/as/` });
    const suffix = secondClient ? '-b' : '';
    const idpClient = { id: `idp-client${suffix}`, authentication: { method: 'client_secret_post', secret: clientSecrets[`idp-client${suffix}`] } };
    const resourceClient = { id: `resource-client${suffix}`, authentication: { method: 'client_secret_post', secret: clientSecrets[`resource-client${suffix}`] } };
    const login = await loginViaAmba({ base, idpClient, sessions, getCodeToken: code => codeTokens.get(code) });
    const context = issueMission(login.identity, domain, { denied: deniedMission, ttlMs });
    missions.set(context.mission.missionId, context);
    let capturedGrant;
    // Retain test credentials only in this private closure; never export them in evidence.
    const exchangeFetch = async (...args) => {
      const response = await fetch(...args);
      if (String(args[0]) === `${base}/idp/token` && response.ok) capturedGrant = (await response.clone().json()).access_token;
      return response;
    };
    const token = await exchangeIdentityForAccess({
      idpTokenEndpoint: discovered.idpTokenEndpoint, resourceTokenEndpoint: discovered.resourceTokenEndpoint, resourceAuthorizationServer: discovered.resourceIssuer, resource: discovered.resource,
      scope: 'quota:reserve', subjectToken: login.idToken, idpClient, resourceClient, allowLoopbackHttp: true, fetchImpl: exchangeFetch
    });
    let bearer = token.accessToken;
    if (mutation === 'identity-token-as-resource-bearer') bearer = login.idToken;
    if (mutation === 'id-jag-as-resource-bearer') bearer = capturedGrant;
    const client = new Client({ name: secondClient ? 'second-sandbox-client' : 'sandbox-client', version: '0.1.0' });
    clients.add(client);
    await client.connect(new StreamableHTTPClientTransport(new URL(`${base}/mcp`), { requestInit: { headers: { authorization: `Bearer ${bearer}` } } }));
    return {
      context,
      prepare: args => prepareAction(context, args),
      async call(input) {
        const response = await client.callTool({ name: 'reserve_resource', arguments: input });
        return JSON.parse(response.content[0].text);
      },
      async listTools() { return client.listTools(); }
    };
  }
  return {
    base, state, authorize,
    proofRequest(input) {
      return { before: state.remaining, units: input.units, version: state.version, domain,
        action: digest({ mission: input.missionId, actionId: input.actionId, event: input.event.eventHash }) };
    },
    publicState: () => ({ remaining: state.remaining, version: state.version, receipts: state.receipts }),
    inspectPublicEvidence() {
      const serialized = JSON.stringify({ remaining: state.remaining, version: state.version, receipts: state.receipts });
      return {
        exportContainsCredentials: [...Object.values(clientSecrets), ...codeTokens.values()].some(secret => serialized.includes(secret)),
        publicStateContainsIdentity: serialized.includes('fixture-user') || serialized.includes('sandbox-tenant')
      };
    },
    async close() {
      await Promise.allSettled([...clients].map(c => c.close()));
      server.closeAllConnections();
      await new Promise(resolve => server.close(resolve));
      restoreAmba();
    }
  };
}
