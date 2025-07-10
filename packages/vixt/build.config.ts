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
      const { outDir, rootDir } = ctx.options
      const clientFileContent = fs.readFileSync(path.resolve(rootDir, 'src', 'client.ts'), 'utf-8')
      fs.readdirSync(outDir).forEach((file) => {
        if (/^client.*[j|t]s$/.test(file)) {
          fs.writeFileSync(path.resolve(outDir, file), clientFileContent)
        }
      })
    },
  },
})
