import { defineConfig } from 'bumpp'

export default defineConfig({
  all: true,
  files: [
    'package.json',
    'packages/*/package.json',
    'playerground/layer-shared/package.json',
  ],
  execute: 'pnpm changelog',
})
