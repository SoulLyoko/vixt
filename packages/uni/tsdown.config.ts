import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/node/**/*',
    outDir: 'dist/node',
    platform: 'node',
    deps: {
      skipNodeModulesBundle: true,
    },
    copy: [
      { from: 'src/types', to: 'dist' },
    ],
  },
  {
    entry: 'src/client/**/*',
    platform: 'browser',
    outDir: 'dist/client',
    deps: {
      skipNodeModulesBundle: true,
      neverBundle: [/virtual:/, /@\//],
    },
  },
])
