import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/node/**/*',
    outDir: 'dist/node',
    platform: 'node',
    deps: {
      neverBundle: ['vite'],
    },
    copy: [
      { from: 'src/types', to: 'dist' },
    ],
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
