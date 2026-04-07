import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/index.ts',
    platform: 'node',
    copy: ['src/types'],
    deps: {
      neverBundle: ['vite', '@vue/compiler-sfc'],
    },
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
