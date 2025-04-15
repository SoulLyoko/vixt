# 自动导入

自动导入由 [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) 提供支持

默认导入 `vue`、`vue-router`、`pinia`、`@vueuse/core` 以及项目的`composables`、`constants`、`stores`、`utils` 文件夹下的文件。

## 自定义配置

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({
  imports: {
    dirs: ['src/types']
  }
})
```

:::
