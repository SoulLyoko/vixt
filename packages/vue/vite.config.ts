import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: [
    {
      entry: 'src/node/**/*',
      outDir: 'dist/node',
      platform: 'node',
      copy: [{ from: 'src/types', to: 'dist' }],
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
  ],
})
