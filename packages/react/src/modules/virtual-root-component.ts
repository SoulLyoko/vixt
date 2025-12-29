import type { Vixt } from '@vixt/core'

import { defineVixtModule } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'
import path from 'pathe'

function resolveRootComponentPath(vixt: Vixt) {
  for (const layer of vixt._layers) {
    const layerRootComponentPath = path.resolve(layer.config!.srcDir!, 'App.tsx')
    if (fs.existsSync(layerRootComponentPath))
      return layerRootComponentPath
  }

  return resolvePathSync('@vixt/react/client/App')
}

const name = 'virtual:vixt:root-component'
const virtualModuleId = name
const resolvedVirtualModuleId = `\0${virtualModuleId}`
export default defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    return {
      name,
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          const rootComponentPath = resolveRootComponentPath(vixt)
          const rootComponentCode = fs.readFileSync(rootComponentPath, 'utf-8')
          return rootComponentCode
        }
      },
    }
  },
})
