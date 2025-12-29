/// <reference types="vite/client" />
import type { InlineConfig, LogLevel } from 'vite'

import { cwd, env } from 'node:process'

import { cac } from 'cac'
import { findUpSync } from 'find-up'
import path from 'pathe'
import { loadEnv as _loadEnv } from 'vite'

/** https://github.com/vitejs/vite/blob/v8.0.0-beta.3/packages/vite/src/node/cli.ts */
export interface GlobalCLIOptions {
  '--'?: string[]
  'c'?: boolean | string
  'config'?: string
  'base'?: string
  'l'?: LogLevel
  'logLevel'?: LogLevel
  'clearScreen'?: boolean
  'configLoader'?: InlineConfig['configLoader']
  'd'?: boolean | string
  'debug'?: boolean | string
  'f'?: string
  'filter'?: string
  'm'?: string
  'mode'?: string
  'force'?: boolean
  'w'?: boolean
}

export function loadCLIOptions(): GlobalCLIOptions {
  return cac().parse().options ?? {}
}

export function loadMode() {
  const { mode, m } = loadCLIOptions()
  return mode || m || env.NODE_ENV
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
