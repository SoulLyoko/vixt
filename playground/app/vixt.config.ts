import { defineVixtConfig } from 'vixt/core'

export default defineVixtConfig({
  extends: ['@vixt/layer-app'],
  app: {
    css: ['uview-plus/index.scss', '@/styles/main.css'],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['@uni-helper/uni-ui-types'],
      },
    },
    typeCheck: { vueTsc: true },
  },
})
