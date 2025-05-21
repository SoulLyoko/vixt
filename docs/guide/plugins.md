# 插件

Vixt会在`createApp`之后自动扫描并执行`plugins`文件夹中的所有插件

## 创建插件

:::code-group

```ts [plugins/my-plugin.ts]
import { defineVixtPlugin } from 'vixt/client'

interface PluginOptions {
  enabled?: boolean
}

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    myPluginOptions?: PluginOptions
  }
}

export default defineVixtPlugin({
  name: 'my-plugin',
  setup(vixt) {
    console.log(vixt) // { app, router, routes, pinia, appConfig }
  }
})
```

:::
