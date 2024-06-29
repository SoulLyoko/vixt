import { defineVixtConfig } from 'vixt/core'

export default defineVixtConfig({
  extends: ['node_modules/@vixt/layer-shared', 'node_modules/@vixt/layer-app'],
  app: {
    css: ['@/styles/main.css'],
  },
})
