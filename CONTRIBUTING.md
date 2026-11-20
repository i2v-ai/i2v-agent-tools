# Contributing

Use Node.js 22 and Python 3. Build and test a clean checkout with `npm ci --ignore-scripts` and `npm test`. Use synthetic media and fixture credentials in tests. Submit reproducible changes with English commit messages and a description of the client or API behavior tested.

The website owns the CLI source and Skill content. Keep the mirror byte-for-byte identical to the canonical release. Regenerate SDK request types with `npm run generate --workspace @i2v-ai/sdk` after refreshing the pinned OpenAPI snapshot. The package CLI's bin comes directly from the bundled Skill script. Run both packed-artifact smoke tests before a release.

Open a [bug report](https://github.com/i2v-ai/i2v-agent-tools/issues/new/choose) with a concise contract example or minimal reproducer. Share setup questions and workflow examples in [Discussions](https://github.com/i2v-ai/i2v-agent-tools/discussions). Follow the [security policy](./SECURITY.md) for private reports.
