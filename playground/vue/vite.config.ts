import { defineConfig } from 'vite-plus'
import { playwright } from 'vite-plus/test/browser-playwright'
import vixt from 'vixt/vue'

export default defineConfig({
  plugins: [vixt()],
  server: {
    warmup: {
      // warmup for first run test
      clientFiles: ['./src/main.ts'],
    },
  },
  optimizeDeps: {
    include: ['@iconify/vue'],
  },
  test: {
    globals: true,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      testerHtmlPath: './index.html',
      instances: [{ browser: 'chromium' }],
    },
  },
})
