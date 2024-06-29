import { defineConfig } from 'vite'
import vixt from 'vixt/uni'

export default defineConfig({
  server: { port: 5174 },
  plugins: [vixt()],
})
