import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readJson(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const [portable, claude, marketplace, portableMcp, claudeMcp] = await Promise.all(
  ['plugin.json', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', 'mcp.json', '.mcp.json'].map(readJson),
);
for (const field of ['name', 'version', 'description', 'author', 'homepage', 'repository', 'license']) {
  assert.deepEqual(claude[field], portable[field], `Claude plugin ${field} differs from the portable manifest`);
}
assert.equal(marketplace.owner.name, portable.author.name);
assert.equal(marketplace.name, portable.name);
assert.deepEqual(marketplace.plugins, [{ name: portable.name, source: './' }]);
const portableServer = portableMcp.mcpServers.i2v;
assert.equal(portableServer.type, 'streamable-http');
assert.deepEqual(claudeMcp.mcpServers, {
  i2v: { type: 'http', url: portableServer.url },
});
console.log('Claude Code and portable plugin metadata use the same identity and MCP endpoint.');
