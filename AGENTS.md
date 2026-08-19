# Vixt AI Agent Instructions

This repository is a pnpm-based monorepo for the `vixt` project. It contains the Vixt runtime and CLI packages, framework adapters, documentation, and framework playgrounds.

## Key facts

- Use `pnpm` as the package manager. The root `package.json` requires `pnpm >= 11` and `node >= 24` (`packageManager` is `pnpm@11.21.0`).
- The repository uses Vite+ tooling. `vp` provides built-in formatting, linting, type checking, testing, and packing; `vpr` runs workspace scripts.
- The root `package.json` defines automation commands and delegates builds and playground tasks to workspaces.
- `pnpm-workspace.yaml` includes `packages/*`, `playground/*`, and `docs`.
- Primary package directories:
  - `packages/core`
  - `packages/vixt` (development entrypoints and CLI wrapper)
  - `packages/vue`
  - `packages/react`
  - `packages/uni`
  - `packages/vitepress`
  - `packages/create-vixt`
- Playgrounds are under `playground/`. Runnable integration apps include `vue`, `react`, `uni`, `nuxt`, `nitro`, and `void`; `layer-*` directories contain shared or framework-specific layers used by those apps.

## Recommended agent behavior

- Prefer editing source packages in `packages/` for core features and adapters; package builds are configured by each package's `vite.config.ts`.
- When changing documentation architecture or behaviour, link to existing docs under `docs/en` and `docs/zh` instead of duplicating content.
- Avoid making broad repo-wide changes without first checking if the target package has its own `package.json` or configuration.
- Keep changes aligned with the existing monorepo script patterns, Vite+ configuration, and TypeScript build setup.

## Common commands

- `vpr build` — pack all packages under `packages/*`
- `vpr build:all` — build all playground workspaces
- `vpr build:docs` — build the VitePress docs site
- `vpr build:vue` / `vpr build:react` — build the corresponding playground
- `vpr test:vue` — run the Vue playground tests
- `vp test` — run the root Vitest suite (including `__tests__/`)
- `vp check` — format, lint, and type-check according to `vite.config.ts`
- `vpr dev:docs` — start the docs dev server
- `vpr dev:vue` / `vpr dev:react` — start framework playgrounds
- `vpr dev:app`, `vpr dev:h5`, `vpr dev:mp` — start the Uni App targets

## Important docs references

- `README.md` and `README.zh_CN.md` — project overview and usage
- `docs/en` and `docs/zh` — multilingual guides
- `docs/api/{core,vue,react,uni,vitepress}` — generated/API reference sections
- `packages/*/package.json` — package-specific metadata and entry points
- `playground/*` — example and integration apps used for testing Vixt behavior

## Style and conventions

- Code is TypeScript-first and uses ESM modules.
- Formatting and linting are configured in the root `vite.config.ts` and use Vite+ (`vp check`). Staged `js`, `ts`, and `vue` files are checked with `vp check --fix`.
- Commit messages should follow Conventional Commits as enforced by `commitlint`.

## When to ask for clarification

If a change affects multiple packages or playgrounds, confirm whether to update only the relevant adapter/package or the whole monorepo integration.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
