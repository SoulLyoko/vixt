import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: [
    'pnpm',
    'unplugin-vue-components', // latest version uses `tinyglobby` and gets wrong files order
  ],
})
