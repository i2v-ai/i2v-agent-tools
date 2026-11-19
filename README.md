# i2v.ai Agent Tools

Use i2v.ai image and video models from your coding agent or terminal. Find models by task, check inputs and the current USD reservation, upload references, and recover a submission after a timeout.

## Agent Skill

Install `i2v-models` from this repository.

```sh
npx skills add i2v-ai/i2v-agent-tools --skill i2v-models
```

The website also offers `npx skills add https://i2v.ai`. See the [CLI and MCP setup page](https://i2v.ai/cli) for the download and platform-specific examples.

## Standalone CLI

Run the [bundled script](skills/i2v-models/scripts/i2v-cli.mjs) with Node.js 20 or later.

```sh
node skills/i2v-models/scripts/i2v-cli.mjs list --task text-to-image
node skills/i2v-models/scripts/i2v-cli.mjs doctor
node skills/i2v-models/scripts/i2v-cli.mjs recommend --task image-to-video
node skills/i2v-models/scripts/i2v-cli.mjs plan gpt-image-2 --input '{"prompt":"A blue ceramic mug on a pale tabletop"}'
```

Set `I2V_API_KEY` in the process environment for authenticated commands. `recommend`, `plan`, `recover`, and authenticated `doctor` use the remote MCP endpoint. A paid submission requires an approved `--max-cost-usd`. Pass the plan's `expectedRevision` as `--expected-revision` and retain the original idempotency key. After a timeout, run `recover` with the original credential and idempotency key, then query the recovered task with `status`.

## MCP

- **Remote Streamable HTTP** connects to `https://i2v.ai/api/mcp`. Use OAuth or a Bearer API key according to your client.
- **Local stdio** runs `node /absolute/path/to/i2v-cli.mjs mcp`. Set `I2V_API_KEY` in the client environment. To let the local process upload and download files in your project, set `I2V_WORKSPACE_DIR` to that project's directory.

See the [workflow and recovery guide](skills/i2v-models/references/workflow.md) and [MCP documentation](https://i2v.ai/docs/mcp). The Skill also includes guides for [product images](skills/i2v-models/references/product-image.md), [reference-to-video](skills/i2v-models/references/reference-video.md), and [comparing models](skills/i2v-models/references/model-comparison.md).

## 中文快速开始

在项目目录运行上面的安装命令。用 `recommend` 按任务选型，用 `plan` 检查实际输入及账户美元报价。上传、生成和查单需要 API Key 或已授权的 MCP 连接。超时后用原凭据和幂等键执行 `recover`，找回任务 ID 后继续查单。中文界面与客户端配置见 [i2v.ai CLI](https://i2v.ai/zh/cli)。
