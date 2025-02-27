import { defineConfig } from 'vitest/config'
import vixt from 'vixt/vue'

export default defineConfig({
  plugins: [vixt()],
  server: {
    warmup: {
      clientFiles: ['./src/main.ts'],
    },
  },
  test: {
    globals: true,
    browser: {
      enabled: true,
      provider: 'playwright',
      testerHtmlPath: './index.html',
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
})
