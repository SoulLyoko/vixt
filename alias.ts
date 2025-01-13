import { resolve } from 'node:path'

export const alias = {
  '@vixt/core': resolve('packages/core/src'),
  '@vixt/uni': resolve('packages/uni/src'),
  '@vixt/vitepress': resolve('packages/vitepress/src'),
  '@vixt/vue': resolve('packages/vue/src'),
  'vixt': resolve('packages/vixt'),
  'vixt/core': resolve('packages/vixt/core'),
  'vixt/uni': resolve('packages/vixt/uni'),
  'vixt/vitepress': resolve('packages/vixt/vitepress'),
  'vixt/vue': resolve('packages/vixt/vue'),
}
