import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/index.ts',
    platform: 'node',
    copy: ['src/types'],
    deps: {
      neverBundle: ['vite'],
    },
  },
  {
    entry: ['src/client/**/*', '!src/client/App.tsx'],
    platform: 'browser',
    outDir: 'dist/client',
    copy: ['src/client/App.tsx'],
    deps: {
      neverBundle: [/virtual:/],
    },
  },
])
