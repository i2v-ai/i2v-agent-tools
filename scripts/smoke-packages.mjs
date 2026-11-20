import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const folder = resolve(process.argv[2] ?? 'packed');
const archives = readdirSync(folder).filter((file) => file.endsWith('.tgz'));
if (archives.length !== 2 ||
    !archives.some(file => file.startsWith('i2v-ai-cli-')) ||
    !archives.some(file => file.startsWith('i2v-ai-sdk-'))) {
  throw new Error('Pack the CLI and SDK in an otherwise empty directory.');
}

const target = mkdtempSync(join(tmpdir(), 'i2v-package-smoke-'));
function run(program, args) {
  const result = spawnSync(program, args, { cwd: target, stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    throw new Error(`${program} did not complete successfully.`, { cause: result.error });
  }
}

try {
  run('npm', ['install', '--no-audit', '--no-fund', '--ignore-scripts', ...archives.map(file => join(folder, file))]);
  run(process.execPath, ['node_modules/@i2v-ai/cli/bin/i2v-cli.mjs', '--help']);
  run(process.execPath, ['--input-type=module', '-e', "import { I2VClient, verifyWebhook } from '@i2v-ai/sdk'; if (!new I2VClient() || typeof verifyWebhook !== 'function') process.exitCode = 1;"]);
} finally {
  rmSync(target, { recursive: true, force: true });
}
