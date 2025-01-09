import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: ['@vitejs/plugin-vue', '@vitejs/plugin-vue-jsx'],
})
