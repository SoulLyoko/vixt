import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  meta: { name: 'layer-shared' },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals'],
      },
    },
  },
})
