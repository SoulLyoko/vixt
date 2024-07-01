import { cwd } from 'node:process'

import path from 'pathe'

import { defineVixtModule } from '..'

const name = 'vixt:alias'
export const alias = defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    return {
      name,
      config() {
        return {
          root: vixt.options.rootDir,
          resolve: {
            alias: {
              '@': `${path.resolve(cwd(), 'src')}`,
              '~': `${path.resolve(cwd(), 'src')}`,
              '@@': path.resolve(cwd()),
              '~~': path.resolve(cwd()),
            },
          },
        }
      },
    }
  },
})
