import vixt from '@vixt/react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 5175 },
  plugins: [vixt()],
})
