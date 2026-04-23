import { PiniaColada } from '@pinia/colada'
import { defineVixtPlugin } from 'vixt/client'

export default defineVixtPlugin(({ app }) => {
  app.use(PiniaColada)
})
