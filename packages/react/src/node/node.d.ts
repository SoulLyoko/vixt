import type React from '@vitejs/plugin-react'
import type { ExtractPluginOptions } from '@vixt/core'
import type Pages from 'vite-plugin-pages'
import type Layouts from 'vite-plugin-vue-layouts'

export interface ReactVixtOptions {
  react?: ExtractPluginOptions<typeof React>
  /** https://github.com/hannoeru/vite-plugin-pages */
  pages?: ExtractPluginOptions<typeof Pages>
  /** https://github.com/JohnCampionJr/vite-plugin-vue-layouts */
  layouts?: ExtractPluginOptions<typeof Layouts>
}

declare module '@vixt/core' {
  interface VixtOptions extends ReactVixtOptions { }
}
