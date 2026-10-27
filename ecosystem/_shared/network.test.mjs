import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import http from 'node:http';
import { installOfflineGuard } from './network.mjs';

test('offline guard rejects non-loopback fetch and sockets before transport', () => {
  const restore = installOfflineGuard();
  try {
    assert.throws(() => fetch('http://192.0.2.1/'), /non-loopback/);
    assert.throws(() => net.connect({ host: '192.0.2.1', port: 443 }), /non-loopback/);
    assert.throws(() => fetch('file:///tmp/fixture'), /non-loopback/);
  } finally { restore(); }
});

test('loopback works but a redirect is not followed even if requested', async () => {
  const restore = installOfflineGuard();
  const server = http.createServer((req, res) => {
    if (req.url === '/redirect') { res.writeHead(302, { location: 'http://192.0.2.1/' }); res.end(); }
    else res.end('local');
  });
  await new Promise(ok => server.listen(0, '127.0.0.1', ok));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal(await (await fetch(base)).text(), 'local');
    await assert.rejects(fetch(`${base}/redirect`, { redirect: 'follow' }));
    assert.equal((await fetch(`${base}/redirect`, { redirect: 'manual' })).status, 302);
  } finally { server.closeAllConnections(); await new Promise(ok => server.close(ok)); restore(); }
});
