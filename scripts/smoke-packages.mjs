import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';

const folder = resolve(process.argv[2] ?? 'packed');
const packageNames = process.argv[3] === '--cli-only' ? ['cli'] : ['cli', 'sdk'];
const archives = readdirSync(folder).filter((file) => file.endsWith('.tgz'));
if (
  archives.length !== packageNames.length ||
  !packageNames.every(name => archives.some(file => file.startsWith(`i2v-ai-${name}-`)))
) {
  throw new Error(`Pack ${packageNames.join(' and ')} in an otherwise empty directory.`);
}

const target = mkdtempSync(join(tmpdir(), 'i2v-package-smoke-'));
const run = promisify(execFile);
const model = { id: 'fixture-image', mediaType: 'image', name: 'Fixture Image' };
let catalogReads = 0;
const server = createServer((request, response) => {
  if (
    request.method !== 'GET' ||
    request.url !== '/api/v1/generation-models' ||
    request.headers.authorization
  ) {
    response.writeHead(400).end();
    return;
  }
  catalogReads++;
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ data: [model] }));
});

try {
  await run('npm', [
    'install', '--engine-strict', '--no-audit', '--no-fund', '--ignore-scripts',
    ...archives.map(file => join(folder, file)),
  ], { cwd: target, timeout: 30_000 });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const { stdout } = await run(
    'npm',
    ['exec', '--offline', '--package=@i2v-ai/cli', '--', 'i2v', 'list', '--json'],
    {
      cwd: target,
      env: { ...process.env, I2V_BASE_URL: origin, I2V_API_KEY: '' },
      timeout: 20_000,
    }
  );
  assert.deepEqual(JSON.parse(stdout), [model]);

  if (packageNames.includes('sdk')) {
    await run(process.execPath, [
      '--input-type=module', '-e',
      `import assert from 'node:assert/strict';
      import { I2VClient, verifyWebhook } from '@i2v-ai/sdk';
      const client = new I2VClient({ baseUrl: process.argv[1] });
      assert.equal(typeof verifyWebhook, 'function');
      assert.equal((await client.listModels()).data.data[0]?.id, 'fixture-image');`,
      origin,
    ], { cwd: target, timeout: 20_000 });
  }

  assert.equal(catalogReads, packageNames.length);
  console.log(`Verified packed ${packageNames.join(' and ')} on Node ${process.version}.`);
} finally {
  server.close();
  rmSync(target, { recursive: true, force: true });
}
