import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({
  extends: ['@vixt/layer-nitro'],
  nitro: {
    enabled: true,
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    netlify: {},
    vercel: {
      functions: {
        runtime: 'nodejs24.x',
      },
    },
  },
})
