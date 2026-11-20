# Publishing i2v.ai developer tools

## Website and GitHub

1. Verify the public CLI release manifest, Skill discovery index, archive hashes, HTML routes, and documented OpenAPI version against the release candidate.
2. Confirm remote MCP OAuth discovery and test the listed tools through supported clients. Record version, transport, authentication method, and the read-only and write results.
3. Use a tagged GitHub release for the validated installs and archive artifacts. Check the public download from a clean directory.

Run `claude plugin validate --strict .claude-plugin/marketplace.json` and `claude plugin validate --strict .claude-plugin/plugin.json`. Check a clean Git marketplace installation before promoting the Claude Code bundle. Keep the npm workspace under `packages/` so the Claude Code plugin installs without package dependencies. Keep the plugin version in the portable and Claude Code manifests aligned. When the bundled Skills or MCP configuration change, bump the plugin version so installed copies can refresh. The Skills and remote MCP retain their own versioning.

## npm

Confirm that the organization owns the `@i2v-ai` scope. For the first release, use an authenticated maintainer session with Node.js 22.14+ and npm 11.15+. Download the CLI and SDK tarballs from their GitHub preview releases, verify each download against its release checksum, and install both in a clean directory. Stage each reviewed tarball with `npm stage publish ./TARBALL.tgz --access public --tag next`. Review and approve each stage ID with 2FA. New package names can show a public staging placeholder before approval.

CI installs the packed CLI on Node.js 20 and installs both packages on Node.js 22 and 24. It calls a loopback model catalog through the installed CLI command and SDK import. Both release packages are also checked before npm preview staging.

After the packages exist on npm, configure their GitHub Actions trusted publisher with organization `i2v-ai`, repository `i2v-agent-tools`, and workflow filename `npm-stage.yml`. Use stage-only permissions. Run **Stage npm preview** from `main` once per package, providing the exact manifest version. The workflow tests and packs both packages, then stages the selected one using OIDC. An npm maintainer reviews and approves the resulting stage ID.

After approval, check the `next` tag and the approved version on the npm registry. Install each exact version in a clean directory. Check the provenance attached to releases staged through trusted publishing. Promote to `latest` separately after release acceptance.

## MCP Registry and other directories

Run the **Validate and publish MCP Registry metadata** workflow with **publish** unchecked first. After the advertised remote endpoint and version have been verified and release approval has been recorded, run the same workflow with publication enabled on the default branch. Query the [Registry entry](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.i2v-ai%2Fmcp/versions/latest) and check the version and HTTPS endpoint.

### Cursor Marketplace

Cursor loads the root `plugin.json`, `mcp.json`, and `skills/` as one Agent Plugin. To review an exact candidate, extract the Git archive into `~/.cursor/plugins/local/i2v-ai` in a clean Cursor profile and reload the editor. Use the [local plugin instructions](https://cursor.com/docs/plugins#test-plugins-locally) for your client and team settings.

Confirm the plugin exposes `i2v-models`, `i2v-integrate`, and the `plugin-i2v-ai-i2v` connection. Use an authorized test account to connect with read-only access, list image models, and check granted scopes with `get_account`. Revoke the connection and confirm that the prior authorization can no longer read account data. Use the [Cursor connection guide](https://i2v.ai/docs/mcp/cursor) for permissions and troubleshooting.

After validating the public commit and obtaining release approval, submit `https://github.com/i2v-ai/i2v-agent-tools` in the [Cursor Marketplace form](https://cursor.com/marketplace/publish). Once approved, install from Marketplace in a clean project and repeat the read-only check. Record the version and public listing URL. See the [Cursor submission checklist](https://cursor.com/docs/reference/plugins#submission-checklist).

### Other directories

GitHub Copilot can install the endpoint directly while the GitHub Registry listing is pending. Verify the Glama listing separately. Refer to the [client guides](https://i2v.ai/docs/mcp) for configuration.

OpenAI and Anthropic directory submissions require product and policy review in addition to native client tests. Prepare an isolated review workspace, an accessible demo recording, accurate privacy and support links, and realistic success and refusal cases. For OpenAI, clarify prepaid use and upstream service rights. For Anthropic, obtain written permission for general media generation before directory submission.
