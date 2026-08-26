import type { ArgsDef, ParsedArgs } from 'citty'

import { defineCommand, parseArgs } from 'citty'

import { buildArgsDef, commands, devArgsDef } from './commands'

export const mainArgsDef = {
  command: {
    type: 'positional',
    required: true,
  },
} satisfies ArgsDef

export const main = defineCommand({
  meta: {
    name: 'vixt',
    description: 'Vixt CLI',
  },
  args: mainArgsDef,
  subCommands: commands,
})

export const vixtArgsDef = {
  ...mainArgsDef,
  ...buildArgsDef,
  ...devArgsDef,
} satisfies ArgsDef

export type VixtArgs = ParsedArgs<typeof vixtArgsDef>

export type VixtCLIOptions = Partial<VixtArgs>

export function parseVixtArgs(args = process.argv.slice(2)) {
  return parseArgs<typeof vixtArgsDef>(args, vixtArgsDef)
}
