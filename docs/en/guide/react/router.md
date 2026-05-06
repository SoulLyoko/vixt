# Routing

File-based routing is supported by [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages).

The `pages` folder is scanned by default.

## Custom configuration

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  pages: {
    pages: ['src/views']
  }
})
```

:::
