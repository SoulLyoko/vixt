import type { VixtOptions } from '@vixt/core'

import { createVixtPlugin } from '@vixt/core'

import { appVitepress, presetVitepress } from './modules'

export * from './modules'

const defaults: VixtOptions = {
  modules: [appVitepress, presetVitepress],
  srcDirName: '',
}

export default createVixtPlugin({ defaults })
