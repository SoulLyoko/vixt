# 组件

自动按需导入组件由 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 提供支持

默认导入 `components` 文件夹下的组件

## 自定义配置

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({
  components: {
    dirs: ['src/ui']
  }
})
```

:::
