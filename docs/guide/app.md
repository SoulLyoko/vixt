# 应用

## 入口文件

- 使用 vixt 后 `index.html` 和 `main.ts` 将由vixt接管处理，可以在app选项中配置：

:::code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({
  app: {
    css: ['@/style.css'],
    head: {
      title: [{ children: 'vixt-project' }],
    }
  }
})
```

:::

- 原本在 `main.ts` 引入第三方组件的操作，需要迁移至 VixtPlugin：

:::code-group

```ts [src/plugins/register.ts]
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { defineVixtPlugin } from 'vixt'

export default defineVixtPlugin({
  name: 'register',
  setup({ app }) {
    app.use(ElementPlus)
  }
})
```

:::
