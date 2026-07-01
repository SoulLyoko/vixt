import path from 'pathe'

import { defineVixtModule } from '../module'

const name = 'vixt:layer-dep-optimize'
/** @experimental */
export default defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    const optimizeLayerDirs = vixt._layers.map(layer => layer.config!.srcDir!)
    const optimizedDeps = new Set<string>()
    return {
      name,
      enforce: 'pre',
      apply: 'serve',
      async resolveId(source, importer) {
        if (!importer)
          return

        if (!optimizeLayerDirs.some(dir => path.normalize(importer).startsWith(dir)))
          return

        if (optimizedDeps.has(source))
          return

        optimizedDeps.add(source)
        await this.resolve(source, path.join(vixt.options.srcDir!, 'index.html'), { skipSelf: true }).catch(() => null)
      },
    }
  },
})
