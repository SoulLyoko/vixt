import type { sharedArgs, serverArgs } from './shared'
import type { ParsedArgs } from 'citty'
import type { InlineConfig, ServerOptions } from 'vite'

export function resolveSharedConfig(args: ParsedArgs<typeof sharedArgs>) {
  const { root, mode, logLevel, clear, force } = args
  return {
    root,
    mode,
    logLevel,
    clearScreen: clear,
    forceOptimizeDeps: force,
  } satisfies InlineConfig
}

export function resolveServerConfig(args: ParsedArgs<typeof serverArgs>) {
  const { host, port, open, cors, strictPort } = args
  return {
    port: port ? Number(port) : undefined,
    host: host === '' ? '0.0.0.0' : host,
    open,
    cors,
    strictPort,
  } satisfies ServerOptions
}
