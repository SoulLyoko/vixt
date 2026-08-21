import type { ArgsDef, ParsedArgs } from 'citty'

import { defineCommand, parseArgs } from 'citty'

import { buildArgsDef, commands, devArgsDef } from './commands'

export const main = defineCommand({
  meta: {
    name: 'vixt',
    description: 'Vixt CLI',
  },
  args: {
    command: {
      type: 'positional',
      required: true,
    },
  },
  subCommands: commands,
})

export const vixtArgsDef = { ...buildArgsDef, ...devArgsDef } satisfies ArgsDef

export type VixtArgs = ParsedArgs<typeof vixtArgsDef>

export type VixtCLIOptions = Partial<VixtArgs>

export function parseVixtArgs(args = process.argv.slice(3)) {
  return parseArgs<typeof vixtArgsDef>(args, vixtArgsDef)
}
