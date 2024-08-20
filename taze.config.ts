import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: ['@uni-helper/vite-plugin-uni-pages', 'unocss', 'vue-tsc'],
})
