import { defineCommand } from 'citty'

import { sharedArgs } from './shared'
import { resolveSharedConfig } from './utils'

export const prepareCommand = defineCommand({
  meta: {
    name: 'prepare',
    description: 'Prepare vixt app',
  },
  args: {
    ...sharedArgs,
  },
  async run(ctx) {
    const { createBuilder } = await import('vite')
    const config = resolveSharedConfig(ctx.args)
    await createBuilder(config, null)
  },
})
