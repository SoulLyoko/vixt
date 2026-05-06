# Routing

File-based routing is supported by [@uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages).

The `pages` folder is scanned by default.

## Custom configuration

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  uniPages: {
    dir: 'src/views'
  }
})
```

:::
