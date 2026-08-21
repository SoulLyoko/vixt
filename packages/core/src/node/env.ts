/// <reference types="vite/client" />

import { cwd, env } from 'node:process'

import { parseVixtArgs } from '@vixt/cli'
import { findUpSync } from 'find-up'
import path from 'pathe'
import { loadEnv as _loadEnv } from 'vite'

export function loadCLIOptions() {
  return parseVixtArgs()
}

export function loadMode() {
  const { mode } = loadCLIOptions()
  return mode || env.NODE_ENV
}

/**
 * Load workspace and cwd env variables by default
 */
export function loadEnv(mode?: string, envDir?: string | false, prefixes?: string | string[]) {
  mode = mode || loadMode()

  return {
    MODE: mode,
    DEV: env.NODE_ENV !== 'production',
    PROD: env.NODE_ENV === 'production',
    ...loadWorkspaceEnv(mode, prefixes),
    ..._loadEnv(mode!, envDir || cwd(), prefixes),
  } as ImportMeta['env']
}

/**
 * find the workspace dir
 */
export function findUpWorkspaceDir() {
  const workspaceManifestLocation = findUpSync(['pnpm-workspace.yaml', 'pnpm-workspace.yml'])
  return workspaceManifestLocation && path.dirname(workspaceManifestLocation)
}

/**
 * Load workspace env variables
 */
export function loadWorkspaceEnv(mode?: string, prefixes?: string | string[]) {
  const workspaceDir = findUpWorkspaceDir()
  return workspaceDir ? _loadEnv(mode!, workspaceDir, prefixes) : {}
}
