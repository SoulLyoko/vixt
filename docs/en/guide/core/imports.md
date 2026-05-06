# Auto Imports

Auto imports are supported by [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import).

By default, Vixt imports files from the project's `composables`, `constants`, `hooks`, `stores`, and `utils` folders.

## Custom configuration

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  imports: {
    dirs: ['src/types']
  }
})
```

:::
