# 从 `vixt` 导入

## defineAppConfig()

提供定义Vixt应用配置的类型提示

```ts
// src/app.config.ts
import { defineAppConfig } from 'vixt/client'

export default defineAppConfig({
  title: 'My Vixt App',
  description: 'A Vixt App',
})
```

## defineVixtPlugin()

提供定义Vixt插件的类型提示

```ts
// src/plugins/my-plugin.ts
import { defineVixtPlugin } from 'vixt/client'

interface PluginOptions {
  enabled?: boolean
}

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    myPlugin?: PluginOptions
  }
}

export default defineVixtPlugin<PluginOptions>({
  name: 'my-plugin',
  setup(vixt) {
    console.log(vixt) // { app, router, routes, pinia, appConfig }
  }
})
```

## defineVuePlugin()

提供定义Vue插件的类型提示

```ts
import { defineVuePlugin } from 'vixt/client'

interface PluginOptions {
  enabled?: boolean
}

export const myVuePlugin = defineVuePlugin<PluginOptions>({
  install(app, options) {
    console.log(app)
    console.log(options)
  }
})
```
