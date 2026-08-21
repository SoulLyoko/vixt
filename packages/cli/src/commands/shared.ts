import type { ArgsDef } from 'citty'
import type { LogLevel } from 'vite'

export const sharedArgs = {
  root: {
    type: 'positional',
    description: 'The root directory of your project (default: .)',
    required: false,
    default: undefined,
  },
  debug: {
    type: 'boolean',
    description: 'Show debug logs',
    alias: ['d'],
    default: false,
  },
  mode: {
    type: 'string',
    description: 'Set env mode',
    alias: ['m'],
  },
  logLevel: {
    type: 'enum',
    description: 'info|warn|error|silent',
    options: ['info', 'warn', 'error', 'silent'] satisfies LogLevel[],
    alias: ['l'],
  },
  clear: {
    type: 'boolean',
    description: 'Clear console on restart',
    default: false,
  },
  force: {
    type: 'boolean',
    description: 'Force the optimizer to ignore the cache and re-bundle',
    default: false,
  },
} satisfies ArgsDef

export const serverArgs = {
  host: {
    type: 'string',
    description: 'Host to listen on',
  },
  port: {
    type: 'string',
    description: 'Port to listen on',
    alias: ['p'],
  },
  open: {
    type: 'boolean',
    description: 'Open the URL in the browser',
    alias: ['o'],
    default: false,
  },
  cors: {
    type: 'boolean',
    description: 'Configure CORS for the dev server',
  },
  strictPort: {
    type: 'boolean',
    description: 'Exit if specified port is already in use',
  },
} satisfies ArgsDef
