# 样式

## 全局样式

Vixt会将 `app.css` 选项列出的文件引入为全局样式

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  app: {
    css: ['@/style.css'],
  },
})
```

:::

## 局部样式

即 Vue 的 scoped style

```vue
<template>
  <div class="demo" />
</template>

<style scoped>
.demo {
  height: 100%;
}
</style>
```

## 原子化样式

原子化样式由 [unocss](https://github.com/unocss/unocss) 提供支持

### 配置

建立`uno.config.ts`以配置unocss

:::code-group

```ts [uno.config.ts]
import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
  ],
})
```

:::

### 使用

<div bg-gray text-white w-fit px-1 rd>
  UnoCSS
</div>

```vue
<template>
  <div bg-gray text-white w-fit px-1 rd>
    UnoCSS
  </div>
</template>
```
