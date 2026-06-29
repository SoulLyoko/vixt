import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  extends: ['@vixt/layer-uni', '@vixt/layer-vue'],
  app: {
    css: ['@/styles/main.css'],
  },
  typescript: {
    typeCheck: { vueTsc: true },
  },
})
