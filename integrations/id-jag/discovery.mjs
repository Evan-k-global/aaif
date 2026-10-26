const PROFILE = 'urn:ietf:params:oauth:grant-profile:id-jag';
function trustedUrl(value, origins) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.hash || url.search || !origins.has(url.origin)) {
    throw new Error('Untrusted discovery endpoint');
  }
  return url.href;
}
async function getJson(url, origins, fetchImpl) {
  const response = await fetchImpl(trustedUrl(url, origins), { redirect: 'error', signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('Discovery unavailable');
  return response.json();
}
export async function discoverEnterpriseAccess({ resourceMetadataUrl, resource, idpIssuer, resourceIssuer, allowedEndpointOrigins = [], fetchImpl = fetch }) {
  const origins = new Set([new URL(resource).origin, new URL(idpIssuer).origin, new URL(resourceIssuer).origin, ...allowedEndpointOrigins]);
  try {
    const protectedResource = await getJson(resourceMetadataUrl, origins, fetchImpl);
    if (protectedResource.resource !== resource || !protectedResource.authorization_servers?.includes(resourceIssuer)) throw new Error('Resource identity mismatch');
    const as = new URL(resourceIssuer);
    const oauthMetadata = `${as.origin}/.well-known/oauth-authorization-server${as.pathname.replace(/\/$/, '')}`;
    let authorizationServer;
    try { authorizationServer = await getJson(oauthMetadata, origins, fetchImpl); }
    catch { authorizationServer = await getJson(`${resourceIssuer.replace(/\/$/, '')}/.well-known/openid-configuration`, origins, fetchImpl); }
    const idp = await getJson(`${idpIssuer.replace(/\/$/, '')}/.well-known/openid-configuration`, origins, fetchImpl);
    if (authorizationServer.issuer !== resourceIssuer || idp.issuer !== idpIssuer ||
        !authorizationServer.authorization_grant_profiles_supported?.includes(PROFILE)) throw new Error('Unsupported or mismatched authority');
    return {
      resource, idpIssuer, resourceIssuer,
      idpTokenEndpoint: trustedUrl(idp.token_endpoint, origins),
      resourceTokenEndpoint: trustedUrl(authorizationServer.token_endpoint, origins),
      idpJwks: trustedUrl(idp.jwks_uri, origins),
      resourceJwks: trustedUrl(authorizationServer.jwks_uri, origins)
    };
  } catch {
    const error = new Error('Enterprise authorization discovery failed'); error.stage = 'discovery'; throw error;
  }
}
