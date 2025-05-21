import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig } from 'unocss'

import uno from '../layer-shared/uno.config'

export default defineConfig({
  ...uno,
  presets: [
    presetUni() as any,
  ],
})
