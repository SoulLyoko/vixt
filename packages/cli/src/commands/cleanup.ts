import fs from 'node:fs'
import path from 'node:path'

import { defineCommand } from 'citty'

import { sharedArgs } from './shared'

export const cleanupCommand = defineCommand({
  meta: {
    name: 'cleanup',
    description: 'Cleanup vixt files',
  },
  args: {
    root: sharedArgs.root,
  },
  run(ctx) {
    const dirs = ['.vixt', '.output', 'dist', 'node_modules/.vite', 'node_modules/.cache']
    for (const dir of dirs) {
      fs.rmSync(path.resolve(ctx.args.root ?? '', dir), { recursive: true, force: true })
    }
  },
})
