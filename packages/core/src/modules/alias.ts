import { cwd } from 'node:process'

import path from 'pathe'

import { defineVixtModule } from '..'

const name = 'vixt:alias'
export const alias = defineVixtModule({
  meta: { name },
  setup() {
    return {
      name,
      config() {
        return {
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
