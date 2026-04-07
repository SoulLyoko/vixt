import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/index.ts',
    platform: 'node',
    copy: ['src/types'],
    deps: {
      skipNodeModulesBundle: true,
    },
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
