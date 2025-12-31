import type { Vixt } from '@vixt/core'

import { defineVixtModule } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'
import path from 'pathe'
import { parseAst } from 'vite'

function resolveRootComponent(vixt: Vixt) {
  for (const layer of vixt._layers) {
    const layerRootComponentPath = path.resolve(layer.config!.srcDir!, 'App.tsx')
    const isExists = fs.existsSync(layerRootComponentPath)
    const layerRootComponentCode = (isExists && fs.readFileSync(layerRootComponentPath, 'utf-8')) || ''
    if (!isEmptyCode(layerRootComponentCode)) {
      return {
        path: layerRootComponentPath,
        code: layerRootComponentCode,
      }
    }
  }

  const defaultRootComponentPath = resolvePathSync('@vixt/react/client/App')
  return {
    path: defaultRootComponentPath,
    code: fs.readFileSync(defaultRootComponentPath, 'utf-8'),
  }
}

export function isEmptyCode(code?: string) {
  if (!code)
    return true
  try {
    return !parseAst(code, { jsx: true }).body.length
  }
  catch {
    return false
  }
}

const name = 'virtual:vixt:root-component.tsx'
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
