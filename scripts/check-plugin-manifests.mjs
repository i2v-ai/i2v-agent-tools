import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function readJson(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const files = await readdir(new URL('../', import.meta.url));
assert.ok(!files.includes('package.json'), 'Keep the npm workspace in packages/ to avoid plugin dependency installs');

const [portable, claude, marketplace, portableMcp, claudeMcp, registry] = await Promise.all(
  ['plugin.json', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', 'mcp.json', '.mcp.json', 'server.json'].map(readJson),
);
for (const field of ['name', 'version', 'description', 'author', 'homepage', 'repository', 'license']) {
  assert.deepEqual(claude[field], portable[field], `Claude plugin ${field} differs from the portable manifest`);
}
assert.equal(marketplace.owner.name, portable.author.name);
assert.equal(marketplace.name, portable.name);
assert.deepEqual(marketplace.plugins, [{ name: portable.name, source: './' }]);
const portableServer = portableMcp.mcpServers.i2v;
assert.deepEqual(portableMcp.mcpServers, {
  i2v: { type: 'streamable-http', url: 'https://i2v.ai/api/mcp' },
});
assert.deepEqual(claudeMcp.mcpServers, {
  i2v: { type: 'http', url: portableServer.url },
});
assert.deepEqual(registry.remotes, [portableServer], 'Registry metadata must advertise the bundled endpoint');
for (const name of ['i2v-models', 'i2v-integrate']) {
  const skill = await readFile(new URL(`../skills/${name}/SKILL.md`, import.meta.url), 'utf8');
  assert.match(skill, new RegExp(`^---\\r?\\nname: ${name}\\r?\\n`), `Missing Skill or unexpected name: ${name}`);
}
console.log('The portable plugin, Claude Code bundle, and MCP Registry agree on the remote endpoint. Both bundled Skills are present.');
