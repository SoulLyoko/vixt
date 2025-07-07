import fs from 'fs-extra'
import path from 'pathe'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/client.ts',
    'src/index.ts',
    'src/react.ts',
    'src/uni.ts',
    'src/vitepress.ts',
    'src/vue.ts',
  ],
  hooks: {
    'build:done': (ctx) => {
      const { outDir, stub } = ctx.options
      if (stub) {
        const clientIndexPath = path.resolve(outDir, 'client.mjs')
        fs.writeFileSync(clientIndexPath, `export * from "${path.resolve('./src/client.js')}"`)
      }
    },
  },
})
