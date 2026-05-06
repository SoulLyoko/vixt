# 布局

参考 Vitepress 的 [自定义主题](https://vitepress.dev/guide/custom-theme) 和 [扩展默认主题](https://vitepress.dev/guide/extending-default-theme)

## 自定义主题

由于 Vixt 会默认创建一个空白的 `.vitepress/theme/index.ts` 文件，并使用默认模板 `@vixt/vitepress/client/entry`，你可以参考如下代码创建自定义主题并保留 Vixt 预先注入 VixtApp 和注册 VixtPlugin 的功能：

:::code-group

```ts [.vitepress/theme/index.ts]
import VixtTheme from '@vixt/vitepress/client/entry'
import Layout from './Layout.vue'

export default {
  extends: VixtTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
```

:::
