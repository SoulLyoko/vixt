import { defineVixtPlugin } from 'vixt/client'

export default defineVixtPlugin((vixtApp) => {
  console.log('vixtApp:', vixtApp)
  console.log('layer-shared1 plugin loaded')
})
