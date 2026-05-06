# 布局

路由布局由 [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) 提供支持

默认扫描 `layouts` 文件夹

## 自定义配置

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
