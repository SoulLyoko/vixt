import { defineVixtConfig, loadEnv } from 'vixt/core'

const env = loadEnv()
console.log('env:', env)

export default defineVixtConfig({
  extends: ['@vixt/layer-web'],
  app: {
    css: ['@/styles/main.css'],
    head: {
      title: [{ children: 'vixt-web' }],
    },
  },
  devtools: { enabled: true },
  typescript: { typeCheck: { vueTsc: true } },
})
