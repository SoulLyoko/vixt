import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({
  extends: ['@vixt/layer-nitro'],
  nitro: {
    enabled: true,
    netlify: {},
    vercel: {
      functions: {
        runtime: 'bun1.x',
      },
    },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
})
