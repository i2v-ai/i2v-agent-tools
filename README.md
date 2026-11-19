# i2v.ai Agent Tools

Use i2v.ai image and video models from your coding agent or terminal. Discover models, quote a task in USD, upload references, recover a task after a timeout, and save the result in your project.

## Agent Skill

Install `i2v-models` from this repository.

```sh
npx skills add i2v-ai/i2v-agent-tools --skill i2v-models
```

The website also offers `npx skills add https://i2v.ai`. See the [CLI and MCP setup page](https://i2v.ai/cli) for the download and platform-specific examples.

## Standalone CLI

Run the [bundled script](skills/i2v-models/scripts/i2v-cli.mjs) with Node.js 20 or later.

```sh
node skills/i2v-models/scripts/i2v-cli.mjs list --type image
node skills/i2v-models/scripts/i2v-cli.mjs doc gpt-image-2
node skills/i2v-models/scripts/i2v-cli.mjs price gpt-image-2
```

Set `I2V_API_KEY` in the process environment to use `balance`, `quote`, `upload`, `run`, and `status`. Keep the key out of project files. A paid submission requires an approved `--max-cost-usd`. Save its task ID and reuse the original idempotency key, inputs, and budget if the submission receipt is lost.

## MCP

- **Remote Streamable HTTP** connects to `https://i2v.ai/api/mcp`. Use OAuth or a Bearer API key according to your client.
- **Local stdio** runs `node /absolute/path/to/i2v-cli.mjs mcp`. Set `I2V_API_KEY` in the client environment. To let the local process upload and download files in your project, set `I2V_WORKSPACE_DIR` to that project's directory.

See the [workflow and recovery guide](skills/i2v-models/references/workflow.md) and [MCP documentation](https://i2v.ai/docs/mcp).

## 中文快速开始

在项目目录运行上面的安装命令。Skill 会先读实时模型参数，再按实际输入查询美元报价。上传、生成和查单需要 API Key 或已授权的 MCP 连接。提交后保存任务 ID，超时后继续查原任务。中文界面与客户端配置见 [i2v.ai CLI](https://i2v.ai/zh/cli)。
