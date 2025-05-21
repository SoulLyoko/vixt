import { resolve } from 'node:path'

export const alias = {
  '@vixt/core': resolve('packages/core/src'),
  '@vixt/uni': resolve('packages/uni/src'),
  '@vixt/vitepress': resolve('packages/vitepress/src'),
  '@vixt/vue': resolve('packages/vue/src'),
  '@vixt/react': resolve('packages/react/src'),
  'vixt': resolve('packages/vixt'),
}
