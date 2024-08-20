import { defineBuildConfig } from 'unbuild'
import path from 'pathe'
import fs from 'fs-extra'

export default defineBuildConfig({
  declaration: true,
  entries: ['src/index.ts', 'src/client/index.ts'],
  externals: ['vite', 'pathe', 'fs-extra', 'defu', 'pkg-types', 'mlly', 'c12', 'tsx/esm', 'vue', 'vue-router', 'pinia', 'cac', '@vue/language-core'],
  hooks: {
    'mkdist:done': (ctx) => {
      const appComponentPath = path.join(ctx.options.outDir, 'client/App.vue')
      fs.outputFileSync(appComponentPath, `<template>\n  <RouterView />\n</template>\n`)
    },
  },
})
