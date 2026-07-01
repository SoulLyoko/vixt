import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  meta: { name: 'layer-shared' },
  extends: ['@vixt/layer-link'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals'],
      },
    },
  },
})
