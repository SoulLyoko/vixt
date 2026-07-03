// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: 'latest',
  css: ['@unocss/reset/tailwind.css'],
  devServer: { port: 4399 },
  devtools: { enabled: false },
})
