import { defineVixtModule } from '../module'

const name = 'vixt:config'
export const config = defineVixtModule({
  meta: { name },
  setup(options, vixt) {
    return {
      name,
      enforce: 'pre',
      config(config) {
        vixt.options.vite = config
      },
      configResolved(config) {
        vixt.options.vite = config as any
      },
    }
  },
})
