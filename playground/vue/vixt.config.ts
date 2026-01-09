import { defineVixtConfig, loadEnv } from '@vixt/core'

const env = loadEnv()
console.log('env:', env)

export default defineVixtConfig({
  extends: ['@vixt/layer-vue'],
  app: {
    css: ['@/styles/main.css'],
    head: {
      title: [{ children: env.VITE_APP_NAME }],
    },
  },
  devtools: { enabled: true },
  typescript: {
    typeCheck: { vueTsc: true },
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals'],
      },
    },
  },
  copyLayers: true,
})
