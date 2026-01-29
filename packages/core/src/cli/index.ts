import { defineCommand, runMain } from 'citty'

const prepare = defineCommand({
  meta: {
    name: 'prepare',
    description: 'Prepare Vixt',
  },
  async run() {
    const { loadConfigFromFile } = await import('vite')
    // load config with 'native'
    await loadConfigFromFile({ command: 'serve', mode: 'dev' }, undefined, undefined, undefined, undefined, 'native')
  },
})

const main = defineCommand({
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
  subCommands: {
    prepare,
  },
})

runMain(main)
