<p align="center">
  <a href="https://i2v.ai">
    <img src="https://i2v.ai/brand/folded-rabbit-light.png" alt="i2v.ai" width="96">
  </a>
</p>

<h1 align="center">i2v.ai developer ecosystem</h1>

<p align="center">
  Hub for every i2v.ai developer surface: CLI, SDKs, Agent Skills, remote MCP, GitHub Action and examples.<br>
  <a href="https://i2v.ai">Website</a> ·
  <a href="https://i2v.ai/docs">Documentation</a> ·
  <a href="https://i2v.ai/llms.txt">Agent index</a> ·
  <a href="https://github.com/i2v-ai">Organization</a>
</p>

## Pick a surface

| Surface | Install or connect | Repository |
| --- | --- | --- |
| CLI | `npm i -g @i2v-ai/cli` · `npx --yes @i2v-ai/cli` · `brew install i2v-ai/tap/i2v` | [i2v-cli](https://github.com/i2v-ai/i2v-cli) |
| TypeScript SDK | `npm i @i2v-ai/sdk` | [i2v-sdk-js](https://github.com/i2v-ai/i2v-sdk-js) |
| Python SDK | `pip install i2v-ai` | [i2v-sdk-python](https://github.com/i2v-ai/i2v-sdk-python) |
| Agent Skills | `npx skills add https://i2v.ai` | [i2v-skills](https://github.com/i2v-ai/i2v-skills) |
| Remote MCP | `https://i2v.ai/api/mcp` | [i2v-mcp](https://github.com/i2v-ai/i2v-mcp) |
| GitHub Action | `uses: i2v-ai/generate-action@main` | [generate-action](https://github.com/i2v-ai/generate-action) |
| API examples | Bash, Python, TypeScript, Next.js, n8n, Make, Zapier | [i2v-api-examples](https://github.com/i2v-ai/i2v-api-examples) |
| Homebrew tap | `brew install i2v-ai/tap/i2v` | [homebrew-tap](https://github.com/i2v-ai/homebrew-tap) |

## Start in 30 seconds

```bash
npx --yes @i2v-ai/cli list --type image --json
```

The catalog is public. Set `I2V_API_KEY` for quotes, uploads, generation and task status.

## What the platform guarantees

- 12 image models and 16 video models behind one catalog and one USD wallet.
- Quote first: the maximum USD reservation is visible before a task exists.
- `Idempotency-Key` on every submission; a lost response is recovered with the original key.
- Signed webhooks with an HMAC over the timestamp and raw body.
- Remote MCP separates `mcp:read` from `mcp:write`; write needs explicit consent and can be revoked.

## About this repository

`i2v-agent-tools` was the original monorepo. Each surface now has its own repository so versioning, issue trackers and directory submissions stay independent:

| Moved from | Now lives in |
| --- | --- |
| `packages/cli` | [i2v-cli](https://github.com/i2v-ai/i2v-cli) |
| `packages/sdk` | [i2v-sdk-js](https://github.com/i2v-ai/i2v-sdk-js) |
| `packages/python-sdk` | [i2v-sdk-python](https://github.com/i2v-ai/i2v-sdk-python) |
| `skills`, `plugin.json`, `.claude-plugin`, `mcp.json` | [i2v-skills](https://github.com/i2v-ai/i2v-skills) |
| `server.json`, Registry workflow | [i2v-mcp](https://github.com/i2v-ai/i2v-mcp) |
| `action/` | [generate-action](https://github.com/i2v-ai/generate-action) |

This repository stays online as the hub so existing links keep working. New work goes to the dedicated repositories above.

## For AI agents

- <https://i2v.ai/llms.txt>
- <https://i2v.ai/llms-full.txt>
- <https://i2v.ai/.well-known/agent-skills/index.json>
- <https://i2v.ai/cli/release.json>

## Contributing

See the [repository standards](https://github.com/i2v-ai/.github/blob/main/docs/repo-standards.md) and [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT. See [LICENSE](./LICENSE).
