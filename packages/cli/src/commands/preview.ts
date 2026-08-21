import { defineCommand } from 'citty'

import { serverArgs, sharedArgs } from './shared'
import { resolveServerConfig, resolveSharedConfig } from './utils'

export const previewCommand = defineCommand({
  meta: {
    name: 'preview',
    description: 'Preview vixt app',
  },
  args: {
    ...sharedArgs,
    ...serverArgs,
  },
  async run(ctx) {
    const { preview } = await import('vite')
    const config = {
      ...resolveSharedConfig(ctx.args),
      server: resolveServerConfig(ctx.args),
    }
    const server = await preview(config)
    server.printUrls()
    server.bindCLIShortcuts({ print: true })
  },
})
