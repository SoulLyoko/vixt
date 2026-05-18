import { PiniaColada } from '@pinia/colada'
import { createPinia } from 'pinia'

export default defineVixtPlugin({
  name: 'vixt:pinia',
  setup({ app }) {
    const pinia = createPinia()
    app.use(pinia)
    app.use(PiniaColada)
  },
})
