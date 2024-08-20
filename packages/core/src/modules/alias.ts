import { defineVixtModule } from '..'

const name = 'vixt:alias'
export const alias = defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    const { rootDir, buildDir, srcDir } = vixt.options
    const defaultAlias: Record<string, string> = {
      '@': srcDir!,
      '~': srcDir!,
      '@@': rootDir!,
      '~~': rootDir!,
    }
    // layers alias
    for (const layer of vixt._layers) {
      if (layer.meta?.alias) {
        defaultAlias[layer.meta.alias] = layer.cwd!
      }
    }
    // buildDir alias
    defaultAlias['#'] = buildDir!
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
