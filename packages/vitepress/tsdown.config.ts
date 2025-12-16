import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/index.ts',
    platform: 'node',
    copy: ['src/types'],
    skipNodeModulesBundle: true,
  },
  {
    entry: 'src/client/**/*',
    platform: 'browser',
    outDir: 'dist/client',
    external: [/virtual:/],
    skipNodeModulesBundle: true,
  },
])
