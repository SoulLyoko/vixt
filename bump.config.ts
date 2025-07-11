import { defineConfig } from 'bumpp'

export default defineConfig({
  all: true,
  files: ['package.json', 'packages/*/package.json'],
  execute: 'pnpm changelog',
})
