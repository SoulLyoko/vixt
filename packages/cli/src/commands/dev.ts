import type { ArgsDef, ParsedArgs } from 'citty'

import { defineCommand } from 'citty'

import { serverArgs, sharedArgs } from './shared'
import { resolveServerConfig, resolveSharedConfig } from './utils'

export const devArgsDef = {
  ...sharedArgs,
  ...serverArgs,
  https: {
    type: 'boolean',
    description: 'Enable HTTPS with a locally-trusted development certificate',
  },
} satisfies ArgsDef

export const devCommand = defineCommand({
  meta: {
    name: 'dev',
    description: 'Create vixt server',
  },
  args: devArgsDef,
  async run(ctx) {
    const { createServer } = await import('vite')
    const config = {
      ...resolveSharedConfig(ctx.args),
      server: resolveServerConfig(ctx.args),
    }
    const server = await createServer(config)
    await server.listen()
    server.printUrls()
    server.bindCLIShortcuts({ print: true })
  },
})

export type DevArgs = ParsedArgs<typeof devArgsDef>
