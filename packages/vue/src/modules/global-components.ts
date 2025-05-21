import type { Vixt } from '@vixt/core'

import fs from 'fs-extra'
import path from 'pathe'

export function genarateGlobalComponents(vixt: Vixt) {
  const { buildTypesDir } = vixt.options
  const codePath = path.resolve(buildTypesDir!, 'global-components.d.ts')
  const code = `
import type { GlobalComponents as _GlobalComponents } from '@vue/runtime-core'

declare module 'vue'{
  interface GlobalComponents extends _GlobalComponents {}
}
`
  fs.outputFileSync(codePath, code)
}
