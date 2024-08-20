import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  easycom: {
    autoscan: true,
    custom: {
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      '^u-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
    },
  },
  globalStyle: {
    navigationBarTitleText: 'vixt-app',
    navigationStyle: 'custom',
  },
})
