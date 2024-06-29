import type { ResolvedConfig } from 'vite'
import type { AppOptions, VixtConfigLayer } from '@vixt/core'

import path from 'pathe'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'

function resolveLayersPlugins(layers: VixtConfigLayer[], from: string) {
  const { plugins = [] } = resolveLayersDirs(layers)
  return plugins.map((pluginPath) => {
    const pluginsDir = path.relative(from, pluginPath)
    return `${pluginsDir}/*.ts`
  })
}

const name = 'vixt:entry'
export const entry = defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults: {
    css: ['virtual:uno.css'],
  },
  setup(options, vixt) {
    let config: ResolvedConfig
    return {
      name: 'vixt:entry',
      enforce: 'pre',
      configResolved(_config) {
        config = _config
      },
      transform(code, id) {
        const mainPath = path.resolve(config.root, 'src/main.ts')
        if (id !== mainPath)
          return

        const { buildDir } = vixt.options
        const layersPluginsPath = resolveLayersPlugins(vixt._layers, path.join(config.root, buildDir!))
        const cssTemplate = options?.css?.map(e => `import '${e}'`).join('\n')

        code += `
import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import { pages } from 'virtual:uni-pages'
${cssTemplate}
`

        code = code.replace(
          /(createApp[\s\S]*?)(return\s\{\s*app)/,
        `$1
const pinia = Pinia.createPinia()
pinia.use(createUnistorage())
app.use(pinia)

// install all plugins under 'plugins/'
const plugins = import.meta.glob(${JSON.stringify(layersPluginsPath)}, { import: 'default', eager: true })
// @ts-ignore
Object.values(plugins).forEach((plugin) => typeof plugin === 'function' && plugin({ app, routes: pages, pinia }) )
$2`,
        )

        return code
      },
    }
  },
})
