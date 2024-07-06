import path from 'pathe'

import { defineVixtModule } from '..'

const name = 'vixt:alias'
export const alias = defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    const { rootDir, buildDir } = vixt.options
    return {
      name,
      config() {
        return {
          root: rootDir,
          resolve: {
            alias: {
              '@': `${path.resolve(rootDir!, 'src')}`,
              '~': `${path.resolve(rootDir!, 'src')}`,
              '@@': path.resolve(rootDir!),
              '~~': path.resolve(rootDir!),
              '#': path.resolve(rootDir!, buildDir!),
            },
          },
        }
      },
    }
  },
})
