# Layouts

Refer to Vitepress's [custom theme](https://vitepress.dev/guide/custom-theme) and [extending the default theme](https://vitepress.dev/guide/extending-default-theme).

## Custom theme

Since Vixt creates an empty `.vitepress/theme/index.ts` file by default and uses the default template `@vixt/vitepress/client/entry`, you can create a custom theme while preserving Vixt's pre-injected VixtApp and registered VixtPlugin functionality.

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
