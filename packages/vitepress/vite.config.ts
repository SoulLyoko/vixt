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
      entry: 'src/client/**/*',
      platform: 'browser',
      outDir: 'dist/client',
      deps: {
        neverBundle: [/virtual:/],
      },
    },
  ],
})
