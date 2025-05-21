import fs from 'fs-extra'
import path from 'pathe'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: ['src/node/index.ts', 'src/client/index.ts'],
  externals: ['@vue/language-core'],
  hooks: {
    'build:done': (ctx) => {
      const { outDir, stub } = ctx.options
      if (stub) {
        const clientIndexPath = path.resolve(outDir, 'client/index.mjs')
        fs.writeFileSync(clientIndexPath, `export * from "${path.resolve('./src/client/index.js')}"`)
      }
    },
  },
})
