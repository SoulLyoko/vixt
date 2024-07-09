import path from 'pathe'

import { defineVixtModule } from '..'

const name = 'vixt:alias'
export const alias = defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    const { rootDir, buildDir } = vixt.options
    const defaultAlias: Record<string, string> = {
      '@': `${path.resolve(rootDir!, 'src')}`,
      '~': `${path.resolve(rootDir!, 'src')}`,
      '@@': path.resolve(rootDir!),
      '~~': path.resolve(rootDir!),
    }
    // layers alias
    for (const layer of vixt._layers) {
      if (layer.meta?.alias) {
        defaultAlias[layer.meta.alias] = layer.cwd!
      }
    }
    // buildDir alias
    defaultAlias['#'] = path.resolve(rootDir!, buildDir!)
    return {
      name,
      config() {
        return {
          root: rootDir,
          resolve: {
            alias: defaultAlias,
          },
        }
      },
    }
  },
})
