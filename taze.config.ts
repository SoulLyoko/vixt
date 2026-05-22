import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: [
    '@dcloudio/*', // ignore alpha version
    '@uni-helper/vite-plugin-uni-components', // same as `unplugin-vue-components`
    'unplugin-vue-components', // v28.1.0 uses `tinyglobby` and gets wrong files order (https://github.com/unplugin/unplugin-vue-components/issues/831)
  ],
})
