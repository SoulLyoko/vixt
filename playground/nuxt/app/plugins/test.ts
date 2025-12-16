import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  name: 'test-plugin',
  setup(nuxt) {
    console.log('🚀 ~ nuxt:', nuxt)
  },
})
