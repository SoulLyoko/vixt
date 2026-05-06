# Routing

File-based routing is supported by [vue-router/vite](https://router.vuejs.org/file-based-routing/).

The `pages` folder is scanned by default.

## Custom configuration

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  router: {
    routesFolder: ['src/views']
  }
})
```

:::
