import { defineVixtPlugin } from '@vixt/core/client'
import { pages } from 'virtual:uni-pages'

export default defineVixtPlugin({
  name: 'vixt:router',
  setup(vixt) {
    vixt.routes = pages
  },
})
