# 从 `vixt/core` 导入

## defineVixtConfig()

提供定义Vixt配置的类型提示

```ts
// vixt.config.ts
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  // Vixt配置
})
```

## defineVixtModule()

提供定义Vixt模块的类型提示

```ts
// src/modules/my-module.ts
import { defineVixtModule } from 'vixt'

interface ModuleOptions {
  enabled?: boolean
}

declare module '@vixt/core' {
  interface VixtOptions {
    myModuleOptions?: ModuleOptions
  }
}

const name = 'my-module'
export default defineVixtModule<ModuleOptions>({
  meta: { name },
  defaults: { enabled: true },
  setup(options, vixt) {
    console.log(options) // { enabled: true }
    return {
      name,
      configResolved(config) {
        console.log(config)
      }
    } // return one or more vite plugins
  }
})
```

## defineVitePlugin()

提供定义Vite插件的类型提示

```ts
import { defineVitePlugin } from 'vixt'

interface PluginOptions {
  enabled?: boolean
}

export const myVitePlugin = defineVitePlugin<PluginOptions>((options) => {
  console.log(options)
  return {
    name: 'my-vite-plugin',
    configResolved(config) {
      console.log(config)
    }
  }
})
```
