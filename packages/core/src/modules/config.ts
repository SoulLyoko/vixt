import { defineVixtModule } from '../module'

const name = 'vixt:config'
export const config = defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    return {
      name,
      enforce: 'pre',
      configResolved(config) {
        vixt.options.vite = config
      },
    }
  },
})
