import test from 'node:test';
import assert from 'node:assert/strict';
import { exchangeIdentityForAccess, ExchangeError } from './client.mjs';

function config() {
  return {
    idpTokenEndpoint: 'https://idp.example/token', resourceTokenEndpoint: 'https://auth.example/token',
    resourceAuthorizationServer: 'https://auth.example/', resource: 'https://service.example/mcp',
    scope: 'reserve', subjectToken: 'synthetic-identity-assertion',
    idpClient: { id: 'idp-client', authentication: { method: 'client_secret_post', secret: 'idp-test-secret' } },
    resourceClient: { id: 'resource-client', authentication: { method: 'private_key_jwt', assertion: 'synthetic-client-assertion' } }
  };
}
const grant = () => ({ access_token: 'synthetic-id-jag', issued_token_type: 'urn:ietf:params:oauth:token-type:id-jag', token_type: 'N_A', expires_in: 300 });
const access = () => ({ access_token: 'synthetic-resource-token', token_type: 'Bearer', scope: 'reserve', expires_in: 60 });
function transport(responses, calls = []) {
  return async (url, options) => {
    calls.push({ url, options, form: new URLSearchParams(options.body) });
    const next = responses.shift();
    if (next instanceof Error) throw next;
    return next instanceof Response ? next : Response.json(next);
  };
}

test('two-hop exchange binds audience/resource and separates credentials and token roles', async () => {
  const calls = [];
  const result = await exchangeIdentityForAccess({ ...config(), fetchImpl: transport([grant(), access()], calls) });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, 'https://idp.example/token');
  assert.equal(calls[0].form.get('grant_type'), 'urn:ietf:params:oauth:grant-type:token-exchange');
  assert.equal(calls[0].form.get('audience'), 'https://auth.example/');
  assert.equal(calls[0].form.get('resource'), 'https://service.example/mcp');
  assert.equal(calls[0].form.get('client_id'), 'idp-client');
  assert.equal(calls[0].form.get('client_assertion'), null);
  assert.equal(calls[1].form.get('grant_type'), 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  assert.equal(calls[1].form.get('assertion'), 'synthetic-id-jag');
  assert.equal(calls[1].form.get('client_id'), 'resource-client');
  assert.equal(calls[1].form.get('subject_token'), null);
  assert.equal(calls[1].form.get('client_secret'), null);
  assert.equal(calls[0].options.redirect, 'error');
  assert.equal(result.accessToken, 'synthetic-resource-token');
  assert.equal(JSON.stringify(result).includes('synthetic-id-jag'), false);
});

test('IdP denial stops the resource-AS exchange and sanitizes error payloads', async () => {
  const calls = [];
  const fetchImpl = transport([new Response('leaked-test-secret', { status: 403 })], calls);
  await assert.rejects(exchangeIdentityForAccess({ ...config(), fetchImpl }), e =>
    e instanceof ExchangeError && e.stage === 'idp' && e.status === 403 && !String(e).includes('leaked'));
  assert.equal(calls.length, 1);
});

test('wrong issued-token type is not forwarded to the resource AS', async () => {
  const calls = [];
  await assert.rejects(exchangeIdentityForAccess({ ...config(), fetchImpl: transport([
    { ...grant(), issued_token_type: 'urn:ietf:params:oauth:token-type:access_token' }
  ], calls) }), ExchangeError);
  assert.equal(calls.length, 1);
});

test('resource-AS rejection is a resource-stage failure', async () => {
  await assert.rejects(exchangeIdentityForAccess({ ...config(), fetchImpl: transport([
    grant(), new Response('private-grant-details', { status: 401 })
  ]) }), e => e.stage === 'resource' && e.status === 401 && !String(e).includes('private-grant'));
});

test('token endpoints cannot redirect credentials to HTTP or embedded-user URLs', async () => {
  for (const endpoint of ['http://idp.example/token', 'https://user:secret@idp.example/token', 'https://idp.example/token?secret=x']) {
    let called = false;
    await assert.rejects(exchangeIdentityForAccess({ ...config(), idpTokenEndpoint: endpoint, fetchImpl: async () => { called = true; } }), TypeError);
    assert.equal(called, false);
  }
});

test('both client registrations are checked before sending a request', async () => {
  let called = false;
  await assert.rejects(exchangeIdentityForAccess({ ...config(), resourceClient: { id: 'broken' }, fetchImpl: async () => { called = true; } }), TypeError);
  assert.equal(called, false);
});

test('malformed or expired response cannot produce access credentials', async () => {
  for (const bad of [{ ...grant(), expires_in: 0 }, { ...grant(), access_token: '' }, new Response('not-json')]) {
    await assert.rejects(exchangeIdentityForAccess({ ...config(), fetchImpl: transport([bad]) }), ExchangeError);
  }
});

test('network errors do not disclose server-provided secrets', async () => {
  await assert.rejects(exchangeIdentityForAccess({ ...config(), fetchImpl: transport([new Error('secret-from-network')]) }), e =>
    e.stage === 'idp' && !String(e).includes('secret-from-network'));
});

test('non-bearer resource response is rejected and omitted scope stays unknown', async () => {
  await assert.rejects(exchangeIdentityForAccess({ ...config(), fetchImpl: transport([grant(), { ...access(), token_type: 'N_A' }]) }), ExchangeError);
  const token = access(); delete token.scope;
  const result = await exchangeIdentityForAccess({ ...config(), fetchImpl: transport([grant(), token]) });
  assert.equal(result.scope, null);
});
