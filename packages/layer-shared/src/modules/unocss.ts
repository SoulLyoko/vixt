import type { VitePluginConfig as UnocssOptions } from 'unocss/vite'

import UnoCSS from 'unocss/vite'
import { defineVixtModule } from 'vixt'

declare module '@vixt/core' {
  interface VixtOptions {
    /** https://github.com/unocss/unocss */
    unocss?: UnocssOptions
  }
}

export default defineVixtModule<UnocssOptions>({
  meta: { name: 'vixt:unocss', configKey: 'unocss' },
  setup(options, vixt) {
    vixt.options.app ??= {}
    vixt.options.app.css ??= []
    vixt.options.app.css.unshift('virtual:uno.css', '@unocss/reset/tailwind.css')
    return UnoCSS(options)
  },
})
