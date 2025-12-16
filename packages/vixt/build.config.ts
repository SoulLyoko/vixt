import fs from 'fs-extra'
import path from 'pathe'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/index.ts',
    'src/react.ts',
    'src/uni.ts',
    'src/vitepress.ts',
    'src/vue.ts',
  ],
  hooks: {
    'build:done': (ctx) => {
      const { outDir, rootDir, stub } = ctx.options
      if (stub) {
        const clientSrc = path.resolve(rootDir, 'src/client.ts')
        fs.copyFileSync(clientSrc, path.resolve(outDir, 'client.mjs'))
        fs.copyFileSync(clientSrc, path.resolve(outDir, 'client.d.mts'))
      }
    },
  },
})
