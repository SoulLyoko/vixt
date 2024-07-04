import { defineVixtConfig } from 'vixt/core'

export default defineVixtConfig({
  extends: ['@vixt/layer-shared', '@vixt/layer-web'],
  app: {
    css: ['@/styles/main.css'],
    head: {
      title: [{ children: 'vixt-web' }],
    },
  },
  devtools: { enabled: true },
})
