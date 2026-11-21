#!/usr/bin/env node
// Generate one i2v.ai media asset from a GitHub Actions workflow.
// Quotes first, refuses to exceed the approved ceiling, and recovers a
// submission whose response was lost.

import { appendFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { I2VClient, I2VSubmissionUnknownError } from '@i2v-ai/sdk';

function fail(message) {
  console.error('i2v.ai action: ' + message);
  process.exit(1);
}

function setOutput(name, value) {
  const file = process.env.GITHUB_OUTPUT;
  if (!file) return;
  appendFileSync(file, name + '=' + String(value ?? '').replace(/\r?\n/g, ' ') + '\n');
}

const apiKey = process.env.I2V_API_KEY;
if (!apiKey) fail('set the api-key input or I2V_API_KEY.');
const model = process.env.I2V_MODEL;
if (!model) fail('set the model input.');
const maxCostUsd = process.env.I2V_MAX_COST_USD;
if (!/^(0|[1-9][0-9]*)(\.[0-9]{1,8})?$/.test(maxCostUsd ?? '')) {
  fail('set max-cost-usd to a USD decimal string, for example 0.25.');
}

let inputs;
try {
  inputs = JSON.parse(process.env.I2V_INPUT || '{}');
} catch {
  fail('input must be a JSON object.');
}
if (!inputs || typeof inputs !== 'object' || Array.isArray(inputs)) {
  fail('input must be a JSON object.');
}

const outputFile = process.env.I2V_OUTPUT_FILE || 'i2v-output';
const waitSeconds = Number(process.env.I2V_WAIT_SECONDS || 900);
const idempotencyKey =
  process.env.I2V_IDEMPOTENCY_KEY ||
  'gh-' + (process.env.GITHUB_RUN_ID || 'local') + '-' + (process.env.GITHUB_RUN_ATTEMPT || '1');

const client = new I2VClient({ apiKey });

const quote = (await client.quote({ model, inputs })).data;
const ceiling = Number(quote.maximum?.amount ?? '0');
if (!(ceiling <= Number(maxCostUsd))) {
  fail(
    'quote ' + quote.maximum?.amount + ' ' + quote.maximum?.currency +
    ' exceeds the approved ceiling ' + maxCostUsd + '; nothing was submitted.',
  );
}
console.error('i2v.ai action: quoted ' + quote.maximum?.amount + ' ' + quote.maximum?.currency);

let taskId;
try {
  taskId = (await client.createTask(
    { model, inputs, maxCostUsd, expectedRevision: quote.expectedRevision },
    idempotencyKey,
  )).data.taskId;
} catch (error) {
  if (!(error instanceof I2VSubmissionUnknownError)) throw error;
  console.error('i2v.ai action: submission unknown, looking up the original receipt.');
  const receipt = (await client.recoverSubmission(idempotencyKey)).data;
  taskId = receipt?.taskId ?? null;
  if (!taskId) {
    fail(
      'the original submission is ' + (receipt?.status ?? 'unknown') +
      '; rerun with the same idempotency key ' + idempotencyKey + '.',
    );
  }
}
console.error('i2v.ai action: task ' + taskId);

const result = await client.waitForTask(taskId, { timeoutMs: waitSeconds * 1000 });
const task = result.data;
if (task.status !== 'success') {
  fail('task ' + taskId + ' ended with status ' + task.status + ': ' + JSON.stringify(task.error ?? {}));
}

const urls = [];
for (const item of task.output ?? []) {
  if (typeof item?.url === 'string') urls.push(item.url);
}
if (urls.length === 0) fail('the task succeeded without an output URL.');

const response = await fetch(urls[0], { redirect: 'error' });
if (!response.ok) fail('downloading the result failed with HTTP ' + response.status + '.');
const extension = path.extname(new URL(urls[0]).pathname) || '.bin';
const target = path.resolve(outputFile + (path.extname(outputFile) ? '' : extension));
await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, Buffer.from(await response.arrayBuffer()));
await writeFile(
  target + '.task.json',
  JSON.stringify({ taskId, model, idempotencyKey, quote, task }, null, 2) + '\n',
);

await setOutput('task-id', taskId);
await setOutput('output-path', target);
await setOutput('quote-amount', quote.maximum?.amount ?? '');
await setOutput('quote-currency', quote.maximum?.currency ?? '');
console.error('i2v.ai action: wrote ' + target);
