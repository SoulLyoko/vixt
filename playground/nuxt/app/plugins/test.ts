import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  name: 'test-plugin',
  setup(nuxt) {
    console.log('🚀 ~ nuxt:', nuxt)
    console.log('🚀 ~ import.meta.env:', import.meta.env)
  },
})
