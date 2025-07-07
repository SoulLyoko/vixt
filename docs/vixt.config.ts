import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  devtools: { enabled: true },
  typescript: { typeCheck: { vueTsc: true } },
})
