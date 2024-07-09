import { defineVixtConfig } from 'vixt/core'

export default defineVixtConfig({
  meta: { name: 'layer-shared' },
  app: {
    css: ['@unocss/reset/tailwind.css'],
  },
})
