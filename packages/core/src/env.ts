/// <reference types="vite/client" />
import { cwd, env } from 'node:process'

import { cac } from 'cac'
import { loadEnv as _loadEnv } from 'vite'

/**
 * Load workspace and cwd env variables by default
 */
export function loadEnv(mode?: string, envDir?: string, prefixes?: string | string[]) {
  const parsedArgv = cac().parse()
  mode = mode || parsedArgv.options.mode || parsedArgv.options.m || env.NODE_ENV

  return {
    MODE: mode,
    DEV: env.NODE_ENV !== 'production',
    PROD: env.NODE_ENV === 'production',
    ...loadWorkspaceEnv(mode, prefixes),
    ..._loadEnv(mode!, envDir || cwd(), prefixes),
  } as ImportMeta['env']
}

/**
 * Load workspace env variables
 */
export function loadWorkspaceEnv(mode?: string, prefixes?: string | string[]) {
  return env.INIT_CWD ? _loadEnv(mode!, env.INIT_CWD, prefixes) : {}
}
