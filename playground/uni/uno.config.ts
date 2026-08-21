import { presetUni } from '@uni-helper/unocss-preset-uni'
import uno from '@vixt/layer-shared/uno.config.ts'
import { defineConfig } from 'unocss'

export default defineConfig({
  ...uno,
  presets: [
    // @ts-ignore
    presetUni(),
  ],
})
