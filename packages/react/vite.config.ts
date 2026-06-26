import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: [
    {
      entry: 'src/node/**/*',
      outDir: 'dist/node',
      platform: 'node',
      deps: {
        skipNodeModulesBundle: true,
      },
      copy: [{ from: 'src/types', to: 'dist' }],
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
  ],
})
