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
  const loadedEnv: Record<string, string> = {}
  if (envDir) {
    Object.assign(loadedEnv, _loadEnv(mode!, envDir, prefixes))
  }
  else {
    const workspaceDir = env.INIT_CWD!
    Object.assign(loadedEnv, _loadEnv(mode!, workspaceDir, prefixes), _loadEnv(mode!, cwd(), prefixes))
  }

  return {
    MODE: mode,
    DEV: env.NODE_ENV !== 'production',
    PROD: env.NODE_ENV === 'production',
    ...loadedEnv,
  } as ImportMeta['env']
}
