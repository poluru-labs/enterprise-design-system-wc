# Publishing guide

How to release `@poluru-labs/enterprise-design-system-wc` to npm and GitHub.

## Prerequisites

1. npm account with publish access to the `@poluru-labs` scope
2. GitHub repo: `https://github.com/subrahmanyampoluru/enterprise-design-system-wc`
3. Local Node.js 20+
4. Clean git working tree on `main`

```bash
npm login
npm whoami
```

## Pre-flight checklist

```bash
npm run release:check
```

This runs typecheck → lint → tests → production build → `npm pack --dry-run`.

Confirm the packed tarball includes:

- `dist/index.js` + `dist/index.d.ts`
- `src/tokens/**` (CSS tokens)
- `custom-elements.json`
- `README.md`, `LICENSE`, `CHANGELOG.md`

## Version bump

1. Update `CHANGELOG.md` — move Unreleased notes into a new version section
2. Update `RELEASE_NOTES.md` if you keep narrative release notes
3. Bump `package.json` `version` (SemVer)

```bash
npm version patch   # or minor / major
```

`npm version` creates a commit + tag when git is clean.

## Publish to npm

```bash
npm publish --access public
```

`prepublishOnly` runs `release:check` automatically.

Verify:

```bash
npm view @poluru-labs/enterprise-design-system-wc version
```

## Push to GitHub

```bash
git push origin main --follow-tags
```

Create a GitHub Release from the tag and paste the changelog section.

## Consumers

```bash
npm install @poluru-labs/enterprise-design-system-wc
```

```html
<link rel="stylesheet" href="node_modules/@poluru-labs/enterprise-design-system-wc/src/tokens/index.css" />
<!-- or resolve via bundler: -->
<!-- @poluru-labs/enterprise-design-system-wc/tokens.css -->

<script type="module">
  import '@poluru-labs/enterprise-design-system-wc';
</script>
```

## Rollback

npm does not allow unpublishing recent versions easily. Prefer a follow-up patch release that fixes the issue and document it in the changelog.
