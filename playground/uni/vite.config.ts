import vixt from '@vixt/uni'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 5174 },
  plugins: [vixt()],
})
