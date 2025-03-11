# Vixt

## 介绍

Vixt是一个[Vite](https://vitepress.dev/zh/)插件，与[Nuxt](https://nuxt.com.cn/)一样旨在提升开发者体验，名字取自Vite的前两个字母和Nuxt的后两个字母。

## 为什么不用Nuxt?

Nuxt具备SSR和全栈开发的能力，如果你的项目需要这些，Nuxt是个不错的选择。当然它也可以通过配置关闭ssr甚至是混合渲染以适应不同的场景，但是它依然会带来一些额外的性能开销和心智负担，随着项目体积增大，启动时间也会成倍增加（这也是Vixt诞生的主要原因）。

而Vixt则是一个轻量级的Vite插件，抛弃了ssr(也许后续会支持)和服务端，它的启动速度完全取决于Vite，Vite有多快，Vixt就有多快，同时它也提供了一些提升开发者体验的特性，比如文件系统路由、布局、自动导入、模块(modules)、图层(layers)等。

## 创建Vixt项目

Vixt推荐使用pnpm+monorepo管理项目，创建的默认模板也是monorepo项目

```sh
# 默认为monorepo模板，包含vue和uni-app项目
pnpm create vixt my-project

# vue单项目
# pnpm create vixt my-project --template vue-ts

# uni-app单项目
# pnpm create vixt my-project --template uni-ts
```

## 在现有项目中使用

- 删除 packages.json 中的与vixt重复的依赖(如vue,vite等,非必须)
- 创建 .npmrc

```
shamefully-hoist=true
strict-peer-dependencies=false
```

- 安装 vixt

```sh
pnpm add vixt
```

- 新建vixt.config.ts

```ts
import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({})
```

- 修改vite.config.ts

```ts
import vixt from '@vixt/vue'
import { defineConfig } from 'vite'

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
