import { defineConfig } from 'tsdown'

export default defineConfig([
  { entry: 'src/node/index.ts', outDir: 'dist/node', platform: 'node' },
  { entry: 'src/client/index.ts', outDir: 'dist/client', platform: 'browser' },
])
