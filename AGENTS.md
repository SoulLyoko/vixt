# Vixt AI Agent Instructions

This repository is a pnpm-based monorepo for the `vixt` project. It contains core packages, framework adapters, docs, and playground/test apps.

## Key facts

- Use `pnpm` as the package manager. `packageManager` is `pnpm@11.5.2` and the repo requires `node >= 24`.
- The root `package.json` defines primary automation commands and delegates many tasks to package workspaces.
- `pnpm-workspace.yaml` includes `packages/*`, `playground/*`, and `docs`.
- Primary package directories:
  - `packages/core`
  - `packages/vixt`
  - `packages/vue`
  - `packages/react`
  - `packages/uni`
  - `packages/vitepress`
  - `packages/create-vixt`
- Playgrounds are under `playground/` and are used for integration and runtime validation across frameworks.

## Recommended agent behavior

- Prefer editing source packages in `packages/` for core features and adapters.
- When changing documentation architecture or behaviour, link to existing docs under `docs/en` and `docs/zh` instead of duplicating content.
- Avoid making broad repo-wide changes without first checking if the target package has its own `package.json` or configuration.
- Keep changes aligned with the existing monorepo script patterns and TypeScript build setup.

## Common commands

- `pnpm build` — build the main packages with `tsdown`
- `pnpm lint` — run ESLint across the repo
- `pnpm test` — run Vitest at the root
- `pnpm test:vue` — test the Vue package/workspace
- `pnpm build:docs` — build the docs site
- `pnpm build:all` — build all playground apps
- `pnpm dev:docs` — run docs dev server

## Important docs references

- `README.md` — project overview and usage
- `docs/en` and `docs/zh` — multilingual documentation for API and guides
- `packages/*/package.json` — package-specific metadata and entry points
- `playground/*` — example apps used for testing Vixt behavior

## Style and conventions

- Code is TypeScript-first and uses ESM modules.
- The repo uses `eslint` with auto-fix on staged files via `lint-staged` and `simple-git-hooks`.
- Commit messages should follow Conventional Commits as enforced by `commitlint`.

## When to ask for clarification

If a change affects multiple packages or playgrounds, confirm whether to update only the relevant adapter/package or the whole monorepo integration.
