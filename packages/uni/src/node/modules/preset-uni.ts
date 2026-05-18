import type { VixtOptions } from '@vixt/core'

import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import Layouts from '@uni-helper/vite-plugin-uni-layouts'
import Pages from '@uni-helper/vite-plugin-uni-pages'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'

import UniPatch from './uni-patch'

const name = 'vixt:preset-uni'
export default defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const { components = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir } = vixt.options

    const defaultOptions: VixtOptions = {
      uni: {},
      uniPages: { dts: `${buildTypesDir}/uni-pages.d.ts` },
      uniLayouts: {},
      uniComponents: {
        dts: `${buildTypesDir}/components.d.ts`,
        dirs: [...components].reverse(),
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
      },
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    const modules = [
      Pages(options.uniPages),
      Layouts(options.uniLayouts),
      Components(options.uniComponents),
      UniPatch(),
      // @ts-expect-error
      (Uni?.default ?? Uni)(options.uni),
    ]

    return modules
  },
})
