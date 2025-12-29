import type { BuildOptions } from '../config'

import Legacy from '@vitejs/plugin-legacy'
import Analyzer from 'vite-bundle-analyzer'

import { defineVixtModule } from '../module'

const name = 'vixt:build'
export default defineVixtModule<BuildOptions>({
  meta: { name, configKey: 'build' },
  setup(options) {
    const analyzeOptions = {
      enabled: !!options.analyze,
      ...typeof options.analyze === 'object' ? options.analyze : {},
    }
    const legacyOptions = {
      enabled: !!options.legacy,
      ...typeof options.legacy === 'object' ? options.legacy : {},
    }
    return [
      analyzeOptions.enabled && Analyzer(analyzeOptions),
      legacyOptions.enabled && Legacy(legacyOptions),
    ]
  },
})
