import { defineConfig } from 'vite'
import vixt from 'vixt/vue'

export default defineConfig({
  server: { port: 5177 },
  plugins: [vixt()],
  build: {
    rolldownOptions: {
      external: ['cloudflare:workers'],
    },
  },
})
