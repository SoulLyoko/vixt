import { runMain as _runMain, runCommand as _runCommand } from 'citty'

import { commands } from './commands'
import { main } from './main'

export function runMain() {
  return _runMain(main)
}

export function runCommand(
  name: string,
  argv: string[] = process.argv.slice(2),
  data: { overrides?: Record<string, any> } = {},
): Promise<{ result: unknown }> {
  if (!Object.hasOwn(commands, name)) {
    throw new Error(`Invalid command ${name}`)
  }

  const command = commands[name as keyof typeof commands]

  return _runCommand(command as any, {
    rawArgs: [...argv],
    data: {
      overrides: data.overrides || {},
    },
  })
}
