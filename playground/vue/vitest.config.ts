import { playwright } from '@vitest/browser-playwright'
import { createJiti } from 'jiti'
import { defineConfig } from 'vitest/config'

const jiti = createJiti(import.meta.url)
const vixt = await jiti.import<typeof import('vixt/vue').default>('vixt/vue', { default: true })

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
