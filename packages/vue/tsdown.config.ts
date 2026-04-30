import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/node/**/*',
    outDir: 'dist/node',
    platform: 'node',
    deps: {
      neverBundle: ['vite', '@vue/compiler-sfc'],
    },
    copy: [
      { from: 'src/types', to: 'dist' },
    ],
  },
  {
    entry: ['src/client/**/*', '!src/client/App.vue'],
    platform: 'browser',
    outDir: 'dist/client',
    copy: ['src/client/App.vue'],
    deps: {
      neverBundle: [/virtual:/],
    },
  },
])
