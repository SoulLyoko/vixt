# 布局

路由布局由 [@uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts) 提供支持

默认扫描 `layouts` 文件夹

## 自定义配置

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
