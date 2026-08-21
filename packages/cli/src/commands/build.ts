import type { ArgsDef, ParsedArgs } from 'citty'

import { defineCommand } from 'citty'

import { sharedArgs } from './shared'
import { resolveSharedConfig } from './utils'

export const buildArgsDef = {
  ...sharedArgs,
  legacy: {
    type: 'boolean',
    description: 'Enable legacy plugin on build',
  },
  analyze: {
    type: 'boolean',
    description: 'Enable analyze plugin on build',
  },
} satisfies ArgsDef

export const buildCommand = defineCommand({
  meta: {
    name: 'build',
    description: 'Build vixt app',
  },
  args: buildArgsDef,
  async run(ctx) {
    const { createBuilder } = await import('vite')
    const config = resolveSharedConfig(ctx.args)
    const builder = await createBuilder(config, null)
    await builder.buildApp()
    await builder.runDevTools()
  },
})

export type BuildArgs = ParsedArgs<typeof buildArgsDef>
