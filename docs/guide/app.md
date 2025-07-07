# 应用

使用 Vixt 后 , `index.html` , `main.ts` , `App.vue` 将由 Vixt 接管处理

## index.html

可以在app选项中配置生成index.html的内容

:::code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  app: {
    head: {
      title: [{ children: 'vixt-project' }],
    }
  }
})
```

:::

## main.ts

原本在 `main.ts` 引入第三方组件的操作，需要迁移至 VixtPlugin

:::code-group

```ts [src/plugins/register.ts]
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { defineVixtPlugin } from 'vixt/client'

export default defineVixtPlugin({
  name: 'register',
  setup({ app }) {
    app.use(ElementPlus)
  }
})
```

:::

## App.vue

Vixt默认提供 `App.vue` 模板，你可以在项目中新建 `App.vue` 来覆盖默认模板

:::code-group

```vue [src/App.vue]
<template>
  <RouterView />
</template>
```

:::

## app.config.ts

可以在任意ts文件中扩展 `@vixt/core/client` 的 `VixtAppConfig` 接口来自定义应用配置

随后可以用全局函数 `useAppConfig()` 来获取应用配置

如@vixt/vue中就定义了 `vue-router` 和 `pinia-plugin-persistedstate` 的配置

```ts
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { RouterOptions } from 'vue-router'

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    router?: Partial<RouterOptions>
    piniaPersistedState?: PersistedStateOptions
  }
}
```
