# 模块

Vixt会在Vite启动时自动扫描并执行`modules`文件夹中的所有模块

## 创建模块

:::code-group

```ts [modules/my-module.ts]
import { defineVixtModule } from 'vixt'

interface ModuleOptions {
  enabled?: boolean
}

declare module 'vixt' {
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
        console.log(config) // vite config
      }
    } // return one or more vite plugins
  }
})
```

:::
