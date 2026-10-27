let raw = ''; for await (const part of process.stdin) raw += part;
const { base, fixtureToken, action } = JSON.parse(raw);
const target = new URL('/action', base);
if (target.hostname !== '127.0.0.1' || target.protocol !== 'http:') throw new Error('Local fixture required');
const response = await fetch(target, { method: 'POST', redirect: 'error',
  headers: { 'content-type': 'application/json', authorization: `Bearer ${fixtureToken}` }, body: JSON.stringify(action) });
if (!response.ok) throw new Error('Local action rejected at transport');
console.log(JSON.stringify(await response.json()));
