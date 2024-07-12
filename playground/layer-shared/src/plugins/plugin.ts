import { defineVixtPlugin } from 'vixt'

export default defineVixtPlugin(({ appConfig }) => {
  console.log('appConfig:', appConfig)
  console.log('layer-shared plugin loaded')
})
