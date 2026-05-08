/** @module vitepress */
import { cwd } from 'node:process'

import { createVixtPlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'
import path from 'pathe'

import presetVitepress from './modules/preset-vitepress'

const plugins = ['@vixt/vitepress/client/plugins/pinia']

export * from './node.d'

/** @hidden */
export default createVixtPlugin({
  defaults: {
    srcDir: path.resolve(cwd(), '.vitepress/theme'),
    modules: [presetVitepress],
    plugins,
    app: {
      entryFile: 'index.ts',
      entryCode: fs.readFileSync(resolvePathSync('@vixt/vitepress/client/entry'), 'utf-8'),
      transformIndexHtml: false,
    },
    imports: {
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md/, /\.md\?md/],
      imports: ['vue', '@vueuse/core', 'pinia', 'vitepress'],
      vueTemplate: true,
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          types: ['@vixt/vitepress/types'],
        },
        include: ['../.vitepress/**/*'],
      },
    },
    vite: {
      optimizeDeps: {
        exclude: plugins,
      },
    },
  },
})
