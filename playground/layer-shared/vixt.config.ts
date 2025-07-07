import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  meta: { name: 'layer-shared' },
  app: {
    css: ['@unocss/reset/tailwind.css'],
  },
})
