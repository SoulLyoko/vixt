import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: [
    {
      entry: 'src/node/index.ts',
      outDir: 'dist/node',
      platform: 'node',
      deps: {
        neverBundle: ['@vue/language-core'],
      },
    },
    { entry: 'src/cli/index.ts', outDir: 'dist/cli', platform: 'node' },
    { entry: 'src/client/index.ts', outDir: 'dist/client', platform: 'browser' },
  ],
})
