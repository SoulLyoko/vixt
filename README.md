# Vixt

<a href="https://npmjs.com/package/vixt"><img src="https://img.shields.io/npm/v/vixt.svg" alt="npm package"></a>
<a href="https://soullyoko.github.io/vixt/"><img src="https://img.shields.io/badge/Vixt%20Docs-5A5A5A" alt="Website"></a>

## Introduction

<!-- #region introduction -->

Vixt is a [Vite](https://vite.dev/) plugin designed to improve developer experience (DX), inspired by [Nuxt](https://nuxt.com/). The name combines the first two letters of Vite and the last two letters of Nuxt.

Vixt aims to bring Nuxt-style productivity features to popular modern frameworks such as Vue, React, and Uni-app. It includes filesystem routing, layouts, auto-imports, plugins, modules, layers, server-side features, and more. Built on Vite 8 for faster development and build speed, Nitro provides the ability to build full-stack applications.

<!-- #endregion -->

## Installation

<!-- #region installation -->

### Try Vitesse built with Vixt

[vitesse-vixt](https://github.com/SoulLyoko/vitesse-vixt)

### Create a Vixt project

Vixt recommends using pnpm with a monorepo setup, and the default project templates are monorepo-based.

```sh
# Default monorepo template, including vue and uni-app projects
pnpm create vixt my-project

# Vue single-project
# pnpm create vixt my-project --template vue-ts

# Uni-app single-project
# pnpm create vixt my-project --template uni-ts

# React single-project
# pnpm create vixt my-project --template react-ts
```

### Use in an existing project

- Remove duplicate dependencies in `package.json` that Vixt already provides (such as `vue`, `vite`, etc., if not required).
- Create a `.npmrc` file and enable pnpm's `shamefully-hoist`:

```
shamefully-hoist=true
```

- Install Vixt:

```sh
pnpm add vixt
```

- Create `vixt.config.ts`:

```ts
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({})
```

- Update `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vixt from 'vixt/vue'

export default defineConfig({
  plugins: [vixt()],
})
```

- Update `tsconfig.json`:

```json
{
  "extends": "./.vixt/tsconfig.json"
}
```

<!-- #endregion -->

## Packages

| Package                               | Description                           |
| ------------------------------------- | ------------------------------------- |
| [vixt](packages/vixt)                 | Central package for all Vixt packages |
| [@vixt/core](packages/core)           | Core foundation of Vixt               |
| [@vixt/vue](packages/vue)             | Vue adapter layer                     |
| [@vixt/uni](packages/uni)             | Uni-app adapter layer                 |
| [@vixt/vitepress](packages/vitepress) | VitePress adapter layer               |
| [@vixt/react](packages/react)         | React adapter layer                   |
| [create-vixt](packages/create-vixt)   | Project scaffolding tool              |

## Thanks

This project is highly inspired by [Nuxt](https://github.com/nuxt/nuxt) and [Vite](https://github.com/vitejs/vite).

Thanks to [UnJS](https://unjs.io/) for creating helpful packages.

## License

[MIT](LICENSE) License © 2024-PRESENT [SoulLyoko](https://github.com/SoulLyoko)
