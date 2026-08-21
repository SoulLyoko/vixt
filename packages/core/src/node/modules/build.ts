import type { BuildOptions } from '../types'

import Legacy from '@vitejs/plugin-legacy'
import Analyzer from 'vite-bundle-analyzer'

import { loadCLIOptions } from '../env'
import { defineVixtModule } from '../module'

const name = 'vixt:build'
export default defineVixtModule<BuildOptions>({
  meta: { name, configKey: 'build' },
  setup(options) {
    const cliOptions = loadCLIOptions()
    const analyzeOptions = {
      enabled: !!options.analyze,
      ...(typeof options.analyze === 'object' ? options.analyze : {}),
      ...(cliOptions.analyze ? { enabled: true } : {}),
    }
    const legacyOptions = {
      enabled: !!options.legacy,
      ...(typeof options.legacy === 'object' ? options.legacy : {}),
      ...(cliOptions.legacy ? { enabled: true } : {}),
    }

    return [
      analyzeOptions.enabled && Analyzer(analyzeOptions),
      legacyOptions.enabled && Legacy(legacyOptions),
    ]
  },
})
