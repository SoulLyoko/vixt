# Vixt

<a href="https://npmjs.com/package/vixt"><img src="https://img.shields.io/npm/v/vixt.svg" alt="npm package"></a>
<a href="https://soullyoko.github.io/vixt/"><img src="https://img.shields.io/badge/Vixt%20Docs-5A5A5A" alt="Website"></a>

## 介绍

Vixt是一个[Vite](https://vitepress.dev/zh/)插件，与[Nuxt](https://nuxt.com.cn/)一样旨在提升开发者体验(DX)，名字取自Vite的前两个字母和Nuxt的后两个字母。

Vixt的目标是把Nuxt的实用功能带到Vue, React, Uni-app等现代流行框架中，包括文件系统路由、布局、自动导入、插件(plugins)、模块(modules)、层(layers)、服务端等，基于Vite 8实现更快的开发和构建速度，由Nitro提供构建全栈应用的能力。

## 尝试使用Vixt构建的Vitesse吧!

[vitesse-vixt](https://github.com/SoulLyoko/vitesse-vixt)

## 创建Vixt项目

Vixt推荐使用pnpm+monorepo管理项目，创建的默认模板也是monorepo项目

```sh
# 默认为monorepo模板，包含vue和uni-app项目
pnpm create vixt my-project

# vue单项目
# pnpm create vixt my-project --template vue-ts

# uni-app单项目
# pnpm create vixt my-project --template uni-ts

# react单项目
# pnpm create vixt my-project --template react-ts
```

## 在现有项目中使用

- 删除 packages.json 中的与vixt重复的依赖(如vue,vite等,非必须)
- 创建 .npmrc, 启用pnpm的shamefully-hoist

```
shamefully-hoist=true
```

- 安装 vixt

```sh
pnpm add vixt
```

- 新建vixt.config.ts

```ts
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({})
```

- 修改vite.config.ts

```ts
import { defineConfig } from 'vite'
import vixt from 'vixt/vue'

export default defineConfig({
  plugins: [vixt()],
})
```

- 修改tsconfig.json

```json
{
  "extends": "./.vixt/tsconfig.json"
}
```

## Packages

| Package                               | Desc                 |
| ------------------------------------- | -------------------- |
| [vixt](packages/vixt)                 | 统一管理vixt的所有包 |
| [@vixt/core](packages/core)           | vixt的底层核心       |
| [@vixt/vue](packages/vue)             | vue的适配层          |
| [@vixt/uni](packages/uni)             | uni-app的适配层      |
| [@vixt/vitepress](packages/vitepress) | vitepress的适配层    |
| [@vixt/react](packages/react)         | react的适配层        |
| [create-vixt](packages/create-vixt)   | 用于创建模板项目     |

## Thanks

This project is highly inspired by [Nuxt](https://github.com/nuxt/nuxt) and [Vite](https://github.com/vitejs/vite).

Thanks [UnJS](https://unjs.io/) for creating helpful packages.

## License

[MIT](LICENSE) License © 2024-PRESENT [SoulLyoko](https://github.com/SoulLyoko)
