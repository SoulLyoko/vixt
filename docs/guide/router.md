# 路由

约定式文件路由由 [vue-router/vite](https://router.vuejs.org/file-based-routing/) 提供支持

默认扫描 `pages` 文件夹

## 自定义配置

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
