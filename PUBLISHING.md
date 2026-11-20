# Publishing i2v.ai developer tools

## Website and GitHub

1. Verify the public CLI release manifest, Skill discovery index, archive hashes, HTML routes, and documented OpenAPI version against the release candidate.
2. Confirm remote MCP OAuth discovery and test the listed tools through supported clients. Record version, transport, authentication method, and the read-only and write results.
3. Use a tagged GitHub release for the validated installs and archive artifacts. Check the public download from a clean directory.

## npm

Confirm that the organization owns the `@i2v-ai` scope. Build both packages, pack them, inspect their file lists, and run `node scripts/smoke-packages.mjs packed` on the two tarballs. The preview tag is `next`. Use staged publishing with a current npm 11 CLI and have an organization maintainer approve the reviewed tarballs with 2FA. Configure trusted publishing from the public repository for later releases. Read the registry metadata and install each exact version after it becomes public.

## MCP Registry and other directories

Run the **Validate and publish MCP Registry metadata** workflow with **publish** unchecked first. After the advertised remote endpoint and version have been verified and release approval has been recorded, run the same workflow with publication enabled on the default branch. Query the [Registry entry](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.i2v-ai%2Fmcp/versions/latest) and check the version and HTTPS endpoint.

The portable root plugin manifest can be used for Cursor. Validate direct install, OAuth authorization, and read-only listing before requesting Marketplace review. GitHub Copilot can install the endpoint directly while the GitHub Registry listing is pending. Verify the Glama listing separately. Refer to the [client guides](https://i2v.ai/docs/mcp) for configuration.

OpenAI and Anthropic directory submissions require product and policy review in addition to native client tests. Prepare an isolated review workspace, an accessible demo recording, accurate privacy and support links, and realistic success and refusal cases. For OpenAI, clarify prepaid use and upstream service rights. For Anthropic, obtain written permission for general media generation before directory submission.
