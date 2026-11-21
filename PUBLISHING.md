# Publishing

Each surface now releases from its own repository. This repository stays online as the ecosystem hub.

| Surface | Repository | Release process |
| --- | --- | --- |
| CLI (`@i2v-ai/cli`) | [i2v-cli](https://github.com/i2v-ai/i2v-cli) | Run the `Stage npm release` workflow from `main`, then approve the staged version with a maintainer 2FA session. |
| TypeScript SDK (`@i2v-ai/sdk`) | [i2v-sdk-js](https://github.com/i2v-ai/i2v-sdk-js) | Same staged npm flow as the CLI. |
| Python SDK (`i2v-ai`) | [i2v-sdk-python](https://github.com/i2v-ai/i2v-sdk-python) | Push a `python-vX.Y.Z` tag; the workflow publishes through PyPI Trusted Publishing. |
| Agent Skills and plugin manifests | [i2v-skills](https://github.com/i2v-ai/i2v-skills) | Commit, run `node scripts/check-manifests.mjs`, then update the website skill index. |
| Remote MCP metadata | [i2v-mcp](https://github.com/i2v-ai/i2v-mcp) | Bump `server.json`, then run the `Validate and publish MCP Registry metadata` workflow with `publish=true`. |
| GitHub Action | [generate-action](https://github.com/i2v-ai/generate-action) | Tag the release and update the marketplace listing. |

## Rules

- Never rewrite a published version; ship a patch release with corrected metadata instead.
- Every release states the source commit and keeps the previous artifacts reachable.
- The website release check compares published artifacts with the source commit, so update the site manifest in the same change window.
