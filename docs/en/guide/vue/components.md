# Components

Auto-imported components are supported by [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components).

By default, components in the `components` folder are imported.

## Custom configuration

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  components: {
    dirs: ['src/ui']
  }
})
```

:::
