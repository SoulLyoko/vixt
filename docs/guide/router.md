# 路由

约定式文件路由由 [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) 提供支持

默认扫描 `pages` 文件夹

## 自定义配置

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({
  components: {
    pages: ['src/views']
  }
})
```

:::
