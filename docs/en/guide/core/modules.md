# Modules

Vixt automatically scans and executes all modules in the `modules` folder when Vite starts.

## Create a module

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
    }
  }
})
```

:::
