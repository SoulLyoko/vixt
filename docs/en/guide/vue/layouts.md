# Layouts

Route layouts are supported by [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts).

The `layouts` folder is scanned by default.

## Custom configuration

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  layouts: {
    layoutsDirs: ['src/design'],
    pagesDirs: ['src/views']
  }
})
```

:::
