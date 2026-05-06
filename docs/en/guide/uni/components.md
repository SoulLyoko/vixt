# Components

Auto-imported components are supported by [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components).

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
