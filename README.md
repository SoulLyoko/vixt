# Vixt

[文档](https://soullyoko.github.io/vixt/)

## 介绍

Vixt是一个[Vite](https://vitepress.dev/zh/)插件，与[Nuxt](https://nuxt.com.cn/)一样以开发者体验为核心，名字取自Vite的前两个字母和Nuxt的后两个字母。

## 为什么不用Nuxt?

Nuxt具备SSR和全栈开发的能力，如果你的项目需要这些，Nuxt是个不错的选择。当然它也可以通过配置关闭ssr甚至是混合渲染以适应不同的场景，但是它依然会带来一些额外的性能开销和心智负担，随着项目体积增大，启动时间也会成倍增加（这也是Vixt诞生的主要原因）。

而Vixt则是一个轻量级的Vite插件，抛弃了ssr(也许后续会支持)和服务端，它的启动速度完全取决于Vite，Vite有多快，Vixt就有多快，同时它也提供了一些提升开发者体验的特性，比如文件系统路由、布局、自动导入、模块(modules)、图层(layers)等。

## 安装

### 前置准备

- Node.js - v18.0.0 或更新版本
- 文本编辑器 - 推荐使用 VSCode 以及 Volar 扩展
- 终端 - 用于运行命令

```sh
pnpm add vixt -D
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vixt from 'vixt/vue' // vue项目
// import vixt from 'vixt/uni' // uni-app项目

export default defineConfig({
  plugins: [vixt()],
})
```
