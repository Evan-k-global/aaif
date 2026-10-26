const TOKEN_EXCHANGE = 'urn:ietf:params:oauth:grant-type:token-exchange';
const ID_JAG = 'urn:ietf:params:oauth:token-type:id-jag';
const ID_TOKEN = 'urn:ietf:params:oauth:token-type:id_token';
const JWT_BEARER = 'urn:ietf:params:oauth:grant-type:jwt-bearer';

export class ExchangeError extends Error {
  constructor(stage, status = null) {
    super(`${stage} token exchange failed`);
    this.name = 'ExchangeError';
    this.stage = stage;
    this.status = status;
  }
}

function required(value, name) {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(`${name} is required`);
  return value;
}

function endpoint(value, allowLoopbackHttp) {
  const url = new URL(required(value, 'endpoint'));
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.username || url.password || url.hash || url.search ||
      (url.protocol !== 'https:' && !(allowLoopbackHttp && loopback && url.protocol === 'http:'))) {
    throw new TypeError('Token endpoints require HTTPS without URL credentials, query or fragment');
  }
  return url.href;
}

function authenticate(form, client) {
  form.set('client_id', required(client?.id, 'client.id'));
  const auth = client?.authentication;
  if (auth?.method === 'client_secret_post') {
    form.set('client_secret', required(auth.secret, 'client secret'));
  } else if (auth?.method === 'private_key_jwt') {
    form.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
    form.set('client_assertion', required(auth.assertion, 'client assertion'));
  } else if (auth?.method !== 'none') {
    throw new TypeError('Explicit supported client authentication is required');
  }
  // 'none' is only for a provider/client registration that explicitly permits it.
}

async function postToken(fetchImpl, url, form, stage, timeoutMs) {
  let response;
  try {
    response = await fetchImpl(url, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(timeoutMs),
      headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
      body: form.toString()
    });
  } catch {
    throw new ExchangeError(stage);
  }
  if (!response.ok) throw new ExchangeError(stage, response.status);
  let data;
  try { data = await response.json(); } catch { throw new ExchangeError(stage, response.status); }
  if (!data || typeof data.access_token !== 'string' || !data.access_token ||
      (data.expires_in !== undefined && (!Number.isFinite(data.expires_in) || data.expires_in <= 0))) {
    throw new ExchangeError(stage, response.status);
  }
  return data;
}

export async function exchangeIdentityForAccess({
  idpTokenEndpoint, resourceTokenEndpoint, resourceAuthorizationServer, resource,
  scope, subjectToken, idpClient, resourceClient, fetchImpl = globalThis.fetch,
  timeoutMs = 10000, allowLoopbackHttp = false
}) {
  const idpEndpoint = endpoint(idpTokenEndpoint, allowLoopbackHttp);
  const resourceEndpoint = endpoint(resourceTokenEndpoint, allowLoopbackHttp);
  required(resourceAuthorizationServer, 'resource authorization server');
  required(resource, 'resource');
  required(subjectToken, 'identity assertion');
  if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) throw new TypeError('timeoutMs must be positive');

  const first = new URLSearchParams({
    grant_type: TOKEN_EXCHANGE, requested_token_type: ID_JAG,
    audience: resourceAuthorizationServer, resource,
    subject_token: subjectToken, subject_token_type: ID_TOKEN
  });
  if (scope !== undefined) first.set('scope', required(scope, 'scope'));
  authenticate(first, idpClient);
  // Validate resource-side registration before sending any secret to the IdP.
  const second = new URLSearchParams({ grant_type: JWT_BEARER });
  authenticate(second, resourceClient);

  const grant = await postToken(fetchImpl, idpEndpoint, first, 'idp', timeoutMs);
  if (grant.issued_token_type !== ID_JAG || grant.token_type !== 'N_A') throw new ExchangeError('idp');
  second.set('assertion', grant.access_token);
  const token = await postToken(fetchImpl, resourceEndpoint, second, 'resource', timeoutMs);
  if (typeof token.token_type !== 'string' || token.token_type.toLowerCase() !== 'bearer') {
    throw new ExchangeError('resource');
  }
  return {
    accessToken: token.access_token, tokenType: token.token_type,
    expiresIn: token.expires_in ?? null, scope: token.scope ?? null,
    resource: token.resource ?? null
  };
}
