import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: [
    'pnpm',
    'unplugin-vue-components', // v28.1.0 uses `tinyglobby` and gets wrong files order
    // 'unocss,@unocss/*', // v66.1.0 hot reload fail `could not find "src/__uno.css"`
    '@dcloudio/*', // ignore alpha version
  ],
})
