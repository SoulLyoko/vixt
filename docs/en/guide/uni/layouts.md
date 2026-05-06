# Layouts

Route layouts are supported by [@uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts).

The `layouts` folder is scanned by default.

## Custom configuration

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  uniLayouts: {
    layoutDir: 'src/design',
  }
})
```

:::
