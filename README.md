# Vixt

<a href="https://npmjs.com/package/vixt"><img src="https://img.shields.io/npm/v/vixt.svg" alt="npm package"></a>
<a href="https://soullyoko.github.io/vixt/"><img src="https://img.shields.io/badge/Vixt%20Docs-5A5A5A" alt="Website"></a>

## 介绍

Vixt是一个[Vite](https://vitepress.dev/zh/)插件，与[Nuxt](https://nuxt.com.cn/)一样旨在提升开发者体验，名字取自Vite的前两个字母和Nuxt的后两个字母。

## 为什么不用Nuxt?

Nuxt具备SSR和全栈开发的能力，如果你的项目需要这些，Nuxt是个不错的选择。当然它也可以通过配置关闭ssr甚至是混合渲染以适应不同的场景，但是它依然会带来一些额外的性能开销和心智负担，随着项目体积增大，启动时间也会成倍增加（这也是Vixt诞生的主要原因）。

而Vixt则是一个轻量级的Vite插件，抛弃了ssr(也许后续会支持)和服务端，它的启动速度完全取决于Vite，Vite有多快，Vixt就有多快，同时它也提供了一些提升开发者体验的特性，比如文件系统路由、布局、自动导入、插件(plugins)、模块(modules)、层(layers)等。

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

::: tip 加载配置文件报错
从 `vite>=8.0.0-beta.8(rolldown>=1.0.0-beta.60)` 开始，rolldown默认启用了tsconfig的自动发现，导致在未生成 `.vixt/tsconfig.json` 时加载配置文件报错，可以使用以下两种方式来解决：

1. 将vite加载配置文件的方式设置为 native `"dev": "vite --configLoader native"`
2. 添加脚本 `"postinstall": "vixt prepare"`

:::

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
