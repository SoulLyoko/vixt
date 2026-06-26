# Vixt AI Agent Instructions

This repository is a `pnpm` monorepo for the `vixt` project. It contains the main framework packages, a docs site, and multiple playground apps used for integration and runtime validation.

## Key facts

- Use `pnpm` as the package manager. The root `package.json` declares `packageManager: pnpm@11.9.0`.
- The repo requires `node >= 24` and `pnpm >= 11`.
- The workspace is defined in `pnpm-workspace.yaml` and currently includes:
  - `packages/*`
  - `playground/*`
  - `docs`
- Root automation is driven from `package.json` and Vite+ config in `vite.config.ts`.
- Formatting, linting, staged-file checks, test defaults, and task cache behavior are configured centrally in `vite.config.ts`.

## Workspace layout

Primary packages live in `packages/`:

- `packages/core`
- `packages/vixt`
- `packages/vue`
- `packages/react`
- `packages/uni`
- `packages/vitepress`
- `packages/create-vixt`

Playgrounds live in `playground/`:

- `playground/vue`
- `playground/react`
- `playground/uni`
- `playground/nitro`
- `playground/nuxt`
- `playground/layer-vue`
- `playground/layer-react`
- `playground/layer-uni`
- `playground/layer-nitro`
- `playground/layer-shared`

Docs live in `docs/`, with language content under:

- `docs/en`
- `docs/zh`

## Recommended agent behavior

- Prefer editing source packages in `packages/` for framework or runtime behavior changes.
- Treat `packages/vixt` as the user-facing aggregate package and `packages/core` as the shared implementation layer.
- Update only the relevant adapter or package unless the requested change explicitly spans multiple frameworks.
- Check the target package's `package.json` and `vite.config.ts` before making broad changes.
- Use playground apps for integration-oriented validation when a change affects framework behavior.
- When updating docs behavior or architecture, prefer linking to existing docs pages under `docs/en` and `docs/zh` instead of duplicating content.

## Common commands

Root commands:

- `pnpm build` or `vp run build` - build all packages in `packages/*`
- `pnpm check` or `vp check` - run the unified Vite+ checks
- `pnpm lint` or `vp lint` - run linting
- `pnpm test` or `vp test` - run the default test suite
- `pnpm build:all` - build all playground apps
- `pnpm build:docs` - build the docs site
- `pnpm dev:docs` - run the docs dev server
- `pnpm test:all` - run the root tests plus React, Uni, and Vue playground/package test suites

Targeted commands:

- `pnpm test:vue`
- `pnpm test:react`
- `pnpm test:uni`
- `pnpm dev:vue`
- `pnpm dev:react`
- `pnpm dev:nuxt`
- `pnpm dev:nitro`
- `pnpm dev:app`
- `pnpm dev:h5`
- `pnpm dev:mp`

## Validation guidance

- Start with `vp install` if dependencies or generated tool state may be stale.
- Prefer `vp check` and `vp test` for normal validation because repo formatting, linting, and test behavior are centralized in Vite+.
- If a change is limited to one workspace, use filtered commands where possible, for example `vp run --filter <workspace> test`.
- If a change affects package publishing behavior, verify the relevant package build output under `dist/`.
- If a change affects framework runtime behavior, validate the closest matching playground app instead of relying only on unit tests.

## Important references

- `README.md` - project overview and usage
- `package.json` - root scripts, engines, and package manager version
- `pnpm-workspace.yaml` - workspace layout, catalogs, overrides, and package-manager rules
- `vite.config.ts` - Vite+ formatting, lint, staged, and test configuration
- `docs/en` and `docs/zh` - multilingual documentation
- `packages/*/package.json` - package-level metadata and exports
- `playground/*` - integration examples and validation targets

## Style and conventions

- Code is TypeScript-first and uses ESM modules.
- Formatting and linting are managed through Vite+.
- Staged file checks run through `vp check --fix`.
- Commit messages should follow Conventional Commits as enforced by `commitlint`.

## When to ask for clarification

Ask before proceeding when:

- A requested change would require coordinated updates across multiple packages or playgrounds.
- It is unclear whether a fix belongs in `packages/core`, an adapter package, or only a playground.
- A docs change might require synchronized updates in both `docs/en` and `docs/zh`.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
