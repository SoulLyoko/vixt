import type { ImportsOptions } from '../types'

import AutoImport from 'unplugin-auto-import/vite'

import { resolveLayersDirs } from '../config'
import { defineVixtModule } from '../module'

const name = 'vixt:imports'
export default defineVixtModule<ImportsOptions>({
  meta: { name, configKey: 'imports' },
  defaults(vixt) {
    const { buildTypesDir } = vixt.options
    const { composables = [], constants = [], hooks = [], stores = [], utils = [] } = resolveLayersDirs([...vixt._layers].reverse())

    const vixtClientAutoImports = {
      '@vixt/core/client': ['defineAppConfig', 'defineVixtPlugin', 'useAppConfig', 'useVixtApp', '$fetch'],
    }

    return {
      imports: [vixtClientAutoImports],
      dts: `${buildTypesDir}/auto-imports.d.ts`,
      dirs: [composables, constants, hooks, stores, utils].flat(),
    }
  },
  setup(options) {
    return AutoImport(options)
  },
})
