import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/index.ts',
    platform: 'node',
    copy: ['src/types'],
    external: ['vite'],
  },
  {
    entry: ['src/client/**/*', '!src/client/App.tsx'],
    platform: 'browser',
    outDir: 'dist/client',
    external: [/virtual:/],
    copy: ['src/client/App.tsx'],
  },
])
