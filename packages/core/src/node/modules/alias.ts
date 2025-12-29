import type { AliasOptions } from '../config'

import { defineVixtModule } from '../module'

const name = 'vixt:alias'
export default defineVixtModule<AliasOptions>({
  meta: { name, configKey: 'alias' },
  defaults(vixt) {
    const { rootDir, buildDir, srcDir } = vixt.options
    const alias: Record<string, string> = {
      '@': srcDir!,
      '~': srcDir!,
      '@@': rootDir!,
      '~~': rootDir!,
    }
    // layers alias
    for (const layer of vixt._layers) {
      if (layer.meta?.alias) {
        alias[layer.meta.alias] = layer.cwd!
      }
    }
    // buildDir alias
    alias['#'] = buildDir!

    return alias
  },
  setup(options) {
    return {
      name,
      enforce: 'pre',
      config() {
        return {
          resolve: {
            alias: options,
          },
        }
      },
    }
  },
})
