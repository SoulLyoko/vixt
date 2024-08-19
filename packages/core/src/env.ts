/// <reference types="vite/client" />
import { cwd, env } from 'node:process'

import { cac } from 'cac'
import { loadEnv as _loadEnv } from 'vite'

export function loadEnv(mode?: string, envDir?: string, prefixes?: string | string[]) {
  const parsedArgv = cac().parse()
  mode = mode || parsedArgv.options.mode || parsedArgv.options.m || env.NODE_ENV
  return {
    MODE: mode,
    DEV: env.NODE_ENV !== 'production',
    PROD: env.NODE_ENV === 'production',
    ..._loadEnv(mode!, envDir || cwd(), prefixes),
  } as ImportMeta['env']
}
