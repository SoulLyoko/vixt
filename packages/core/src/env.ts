/// <reference types="vite/client" />
import { cwd, env } from 'node:process'

import path from 'pathe'
import { loadEnv as _loadEnv } from 'vite'
import { cac } from 'cac'
import { findUpSync } from 'find-up'

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
  const workspaceManifestLocation = findUpSync(['pnpm-workspace.yaml', 'pnpm-workspace.yml'])
  return workspaceManifestLocation ? _loadEnv(mode!, path.dirname(workspaceManifestLocation), prefixes) : {}
}
