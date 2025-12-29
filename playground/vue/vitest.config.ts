import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

import importVixt from '../../vixt'

const vixt = await importVixt('vixt/vue')

export default defineConfig({
  plugins: [vixt()],
  server: {
    warmup: {
      // warmup for first run test
      clientFiles: ['./src/main.ts'],
    },
  },
  test: {
    globals: true,
    browser: {
      enabled: true,
      // @ts-ignore
      provider: playwright(),
      testerHtmlPath: './index.html',
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
})
