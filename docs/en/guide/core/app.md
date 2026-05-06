# App

With Vixt, `index.html` and `main.ts` are handled by Vixt.

## index.html

You can configure the generated `index.html` contents in the `app` option.

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

Imports of third-party components originally in `main.ts` should be moved to a VixtPlugin.

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

## app.config.ts

You can extend the `VixtAppConfig` interface from `@vixt/core/client` in any TS file to customize application configuration.

Then you can use the global function `useAppConfig()` to retrieve the app config.

For example, `@vixt/vue` defines configurations for `vue-router` and `pinia-plugin-persistedstate`.

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
