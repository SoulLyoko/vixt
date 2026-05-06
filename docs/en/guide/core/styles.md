# Styles

## Global styles

Vixt imports the files listed in the `app.css` option as global styles.

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

## Atomic styles

Atomic CSS is supported by [unocss](https://github.com/unocss/unocss).

### Configuration

Create `uno.config.ts` to configure UnoCSS.

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

### Usage

<div bg-gray text-white w-fit px-1 rd>
  UnoCSS
</div>

```html
<div bg-gray text-white w-fit px-1 rd>UnoCSS</div>
```
