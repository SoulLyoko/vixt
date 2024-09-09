import { defineVixtConfig } from '@vixt/core'

export default defineVixtConfig({
  devtools: { enabled: true },
  typescript: { typeCheck: { vueTsc: true } },
})
