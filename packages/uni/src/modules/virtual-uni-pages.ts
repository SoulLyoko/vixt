import type { Vixt } from '@vixt/core'

import fs from 'fs-extra'
import path from 'pathe'

export function genarateVirtualUniPagesTypes(vixt: Vixt) {
  const { buildTypesDir } = vixt.options
  const codePath = path.resolve(buildTypesDir!, 'virtual-uni-pages.d.ts')
  const code = `declare module 'virtual:uni-pages' {
  import type { PageMetaDatum, SubPackage } from '@uni-helper/vite-plugin-uni-pages'

  export const pages: PageMetaDatum[]
  export const subPackages: SubPackage[]
}
`
  fs.outputFileSync(codePath, code)
}
