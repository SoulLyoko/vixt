import fs from 'fs-extra'
import path from 'pathe'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: ['src/index.ts', 'src/client/index.ts'],
  externals: ['vue', 'vue-router', 'pinia', '@vue/language-core'],
  hooks: {
    'mkdist:done': (ctx) => {
      const appComponentPath = path.join(ctx.options.outDir, 'client/App.vue')
      fs.outputFileSync(appComponentPath, `<template>\n  <RouterView />\n</template>\n`)
    },
  },
})
