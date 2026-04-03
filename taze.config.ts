import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: [
    'pnpm',
    'unplugin-vue-components', // v28.1.0 uses `tinyglobby` and gets wrong files order (https://github.com/unplugin/unplugin-vue-components/issues/831)
    '@uni-helper/vite-plugin-uni-components', // same as `unplugin-vue-components`
    // 'unocss,@unocss/*', // v66.1.0 hot reload fail `could not find "src/__uno.css"` (fixed)
    '@dcloudio/*', // ignore alpha version
    '@vueuse/*', // v14.0.0 drops `resolveUnref` and `resolveRef` but `@uni-helper/uni-use` needed (https://github.com/uni-helper/uni-use/pull/58)
  ],
})
