import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({
  extends: ['@vixt/layer-uni'],
  app: {
    css: ['@/styles/main.css'],
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
