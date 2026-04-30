import type { Vixt } from '@vixt/core'

import { defineVixtModule } from '@vixt/core'
import { parse } from '@vue/compiler-sfc'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'
import path from 'pathe'

function resolveRootComponent(vixt: Vixt) {
  for (const layer of vixt._layers) {
    const layerRootComponentPath = path.resolve(layer.config!.srcDir!, 'App.vue')
    const isExists = fs.existsSync(layerRootComponentPath)
    const layerRootComponentCode = (isExists && fs.readFileSync(layerRootComponentPath, 'utf-8')) || ''
    if (!isEmptyCode(layerRootComponentCode)) {
      return {
        path: layerRootComponentPath,
        code: layerRootComponentCode,
      }
    }
  }

  const defaultRootComponentPath = resolvePathSync('@vixt/vue/client/App')
  return {
    path: defaultRootComponentPath,
    code: fs.readFileSync(defaultRootComponentPath, 'utf-8'),
  }
}

export function isEmptyCode(code?: string) {
  if (!code)
    return true
  try {
    const parsed = parse(code)
    const { descriptor: { template, script, scriptSetup } } = parsed
    return !template && !script && !scriptSetup
  }
  catch {
    return false
  }
}

const name = 'virtual:vixt:root-component.vue'
export default defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    return {
      name,
      resolveId(id) {
        if (id === name) {
          return name
        }
      },
      load(id) {
        if (id === name) {
          const { path, code } = resolveRootComponent(vixt)
          this.addWatchFile(path)
          return code
        }
      },
    }
  },
})
