# i2v.ai Agent Tools

Use i2v.ai image and video models from your coding agent or terminal. Find models by task, check inputs and the current USD reservation, upload references, and recover a submission after a timeout.


## Choose how to use i2v.ai

- **Create media with an Agent.** Install `i2v-models` for model discovery, quoting, safe submission, and recovery.
- **Add i2v.ai to your app.** Install `i2v-integrate` to help a coding Agent implement your server, workflow, or webhook. Use the [runnable examples](https://github.com/i2v-ai/i2v-api-examples) for a backend integration.
- **Use the terminal or local MCP.** Download the [CLI preview package](#install-preview-packages) or use the bundled script below. For a TypeScript backend, use the [SDK](./packages/sdk).

```bash
npx skills add i2v-ai/i2v-agent-tools --skill i2v-integrate
```
## Agent Skill

Install `i2v-models` from this repository.

```sh
npx skills add i2v-ai/i2v-agent-tools --skill i2v-models
```

The website also offers `npx skills add https://i2v.ai`. See the [CLI and MCP setup page](https://i2v.ai/cli) for the download and platform-specific examples.

## Install preview packages

GitHub Releases carries versioned npm archives. Download the `.tgz` and `SHA256SUMS` from the same release.

| Package | GitHub preview | Node.js |
| --- | --- | --- |
| `@i2v-ai/cli` | [CLI 1.2.0](https://github.com/i2v-ai/i2v-agent-tools/releases/tag/developer-preview-2026-11-20) | 20 or newer |
| `@i2v-ai/sdk` | [SDK 0.1.1](https://github.com/i2v-ai/i2v-agent-tools/releases/tag/sdk-v0.1.1-preview) | 22 or newer |

In the download directory, compute the archive SHA-256 and compare it with the line for that file in its release's `SHA256SUMS`.

```bash
shasum -a 256 i2v-ai-cli-1.2.0.tgz
shasum -a 256 i2v-ai-sdk-0.1.1.tgz
```

Copy the verified archive to your project directory and run its installation command there. Run both commands if you need both packages.

```bash
npm install --ignore-scripts ./i2v-ai-cli-1.2.0.tgz
npm install --ignore-scripts ./i2v-ai-sdk-0.1.1.tgz
```

Run `npm exec --offline -- i2v list --type image --json` to check the CLI installation. The SDK's `new I2VClient().listModels()` reads the public catalog without credentials. Follow the [SDK quickstart](./packages/sdk/) for authenticated quotes and task recovery.

## Standalone CLI

Run the [bundled script](skills/i2v-models/scripts/i2v-cli.mjs) with Node.js 20 or later.

```sh
node skills/i2v-models/scripts/i2v-cli.mjs list --task text-to-image
node skills/i2v-models/scripts/i2v-cli.mjs doctor
node skills/i2v-models/scripts/i2v-cli.mjs balance
node skills/i2v-models/scripts/i2v-cli.mjs usage --range 30d
node skills/i2v-models/scripts/i2v-cli.mjs recommend --task image-to-video
node skills/i2v-models/scripts/i2v-cli.mjs plan gpt-image-2 --input '{"prompt":"A blue ceramic mug on a pale tabletop"}'
```

Set `I2V_API_KEY` in the process environment for authenticated commands. `recommend`, `plan`, `recover`, and authenticated `doctor` use the remote MCP endpoint. A paid submission requires an approved `--max-cost-usd`. Pass the plan's `expectedRevision` as `--expected-revision` and retain the original idempotency key. After a timeout, run `recover` with the original credential and idempotency key, then query the recovered task with `status`.

## MCP

- **Remote Streamable HTTP** connects to `https://i2v.ai/api/mcp`. Use OAuth or a Bearer API key according to your client.
- **Local stdio** runs `node /absolute/path/to/i2v-cli.mjs mcp`. Set `I2V_API_KEY` in the client environment. To let the local process upload and download files in your project, set `I2V_WORKSPACE_DIR` to that project's directory.

Use `get_account` for the wallet and current OAuth scopes. Use `get_usage` for account-wide settled charges, usage refunds and net spend by UTC date. API-key clients can also call `GET /api/v1/account` and `GET /api/v1/account/usage?range=30d` on the [API host](https://api.i2v.ai).

Local stdio checks for new versions when it connects. Run `doctor` to inspect the downloaded CLI, bundled Skill and MCP server. Reinstall the Skill in its original scope when ready to update, and restart your client to reload local stdio or refresh the remote tool list. See the [MCP setup page](https://i2v.ai/mcp) for client permissions and connection steps.

See the [workflow and recovery guide](skills/i2v-models/references/workflow.md) and [MCP documentation](https://i2v.ai/docs/mcp). The Skill also includes guides for [product images](skills/i2v-models/references/product-image.md), [reference-to-video](skills/i2v-models/references/reference-video.md), and [comparing models](skills/i2v-models/references/model-comparison.md).

## Claude Code plugin

Install both Skills and the remote MCP connection from the i2v.ai GitHub marketplace.

```bash
claude plugin marketplace add i2v-ai/i2v-agent-tools
claude plugin install i2v-ai@i2v-ai
```

Restart Claude Code or run `/reload-plugins`. In `/mcp`, select `plugin:i2v-ai:i2v` and complete OAuth. On the i2v.ai consent screen, select write access if you want Claude to upload assets or submit generation jobs. Ask Claude to list image models and check your granted scopes. Use `/i2v-ai:i2v-models` for a media workflow or `/i2v-ai:i2v-integrate` when wiring the API into an application. [Claude Code setup and permissions](https://i2v.ai/docs/mcp/claude-code)

To check for a new plugin release and update your installation, run these commands and restart Claude Code.

```bash
claude plugin marketplace update i2v-ai
claude plugin update i2v-ai@i2v-ai
```

## Feedback

Share integration questions, workflow examples, or client compatibility reports in [Discussions](https://github.com/i2v-ai/i2v-agent-tools/discussions). File a [bug report](https://github.com/i2v-ai/i2v-agent-tools/issues/new/choose) for a reproducible defect. See [Contributing](./CONTRIBUTING.md) for test instructions.

## 中文快速开始

在项目目录运行上面的安装命令。用 `recommend` 按任务选型，用 `plan` 检查实际输入及账户美元报价。上传、生成和查单需要 API Key 或已授权的 MCP 连接。超时后用原凭据和幂等键执行 `recover`，找回任务 ID 后继续查单。中文界面与客户端配置见 [i2v.ai CLI](https://i2v.ai/zh/cli)。
