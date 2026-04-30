import { defineVixtPlugin } from 'vixt/client'

export default defineVixtPlugin((ctx) => {
  import.meta.env.DEV && console.log('🚀 ~ ctx:', ctx)
})
