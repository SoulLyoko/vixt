import { defineVixtConfig } from 'vixt/core'

export default defineVixtConfig({
  extends: ['@vixt/layer-shared', '@vixt/layer-app'],
  app: {
    css: ['@/styles/main.css'],
  },
})
