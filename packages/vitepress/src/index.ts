import { cwd } from 'node:process'

import { createVixtPlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'
import path from 'pathe'

import presetVitepress from './modules/preset-vitepress'

export default createVixtPlugin({
  defaults: {
    srcDir: path.resolve(cwd(), '.vitepress/theme'),
    modules: [presetVitepress],
    plugins: ['@vixt/vitepress/client/plugins/pinia'],
    app: {
      entryFile: 'index.ts',
      entryCode: fs.readFileSync(resolvePathSync('@vixt/vitepress/client/entry'), 'utf-8'),
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          types: ['@vixt/vitepress/types'],
        },
      },
    },
  },
})
