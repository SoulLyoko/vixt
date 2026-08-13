import { defineConfig } from 'vite-plus'
import vixt from 'vixt/react'

export default defineConfig({
  server: { port: 5175 },
  plugins: [vixt()],
})
