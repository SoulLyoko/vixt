import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  extends: ['@vixt/layer-shared'],
  meta: { name: 'layer-vue' },
  imports: {
    imports: ['@vueuse/core', 'pinia'],
  },
})
