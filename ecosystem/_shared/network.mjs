import net from 'node:net';

const local = host => ['127.0.0.1', 'localhost', '::1', '[::1]', '::ffff:127.0.0.1'].includes(host);
export function installOfflineGuard() {
  const originalFetch = globalThis.fetch, originalConnect = net.Socket.prototype.connect;
  globalThis.fetch = (input, init = {}) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
    if (!local(url.hostname) || !['http:', 'https:'].includes(url.protocol)) throw new Error('Offline demo blocks non-loopback requests');
    return originalFetch(input, { ...init, redirect: init.redirect === 'manual' ? 'manual' : 'error' });
  };
  net.Socket.prototype.connect = function (...args) {
    const first = Array.isArray(args[0]) ? args[0][0] : args[0];
    const host = typeof first === 'object' ? first.host ?? 'localhost' : typeof args[1] === 'string' ? args[1] : 'localhost';
    if (!(typeof first === 'object' && first.path) && !local(host)) throw new Error('Offline demo blocks non-loopback sockets');
    return originalConnect.apply(this, args);
  };
  return () => { globalThis.fetch = originalFetch; net.Socket.prototype.connect = originalConnect; };
}
