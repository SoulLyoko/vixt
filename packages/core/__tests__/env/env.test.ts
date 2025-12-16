import process from 'node:process'
import url from 'node:url'

import { findUpWorkspaceDir, loadEnv, loadWorkspaceEnv } from '@vixt/core'
import fs from 'fs-extra'
import path from 'pathe'
import { loadEnv as _loadEnv } from 'vite'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
process.chdir(__dirname)

fs.outputFileSync(path.resolve(__dirname, '../.env.development.local'), 'VITE_ENV_DEV_LOCAL=DEV_LOCAL')
fs.outputFileSync(path.resolve(__dirname, '../.env.local'), 'VITE_ENV_LOCAL=LOCAL')

describe('env', () => {
  const mode = 'development'
  const env = loadEnv(mode, __dirname)

  it ('should find workspace dir', () => {
    expect(findUpWorkspaceDir()).toBe(path.resolve(__dirname, '../'))
  })

  it('should merge workspace and cwd env variables', () => {
    const workspaceEnv = loadWorkspaceEnv(mode)
    const cwdEnv = _loadEnv(mode, __dirname)
    expect(env).toMatchObject({ ...workspaceEnv, ...cwdEnv })
    expect(env).toMatchInlineSnapshot(`
      {
        "DEV": true,
        "MODE": "development",
        "PROD": false,
        "VITE_CWD_VAR": "CWD_VAR",
        "VITE_ENV_DEV": "DEV",
        "VITE_ENV_DEV_LOCAL": "DEV_LOCAL",
        "VITE_ENV_LOCAL": "LOCAL",
        "VITE_REPLACE_VAR": "replaced",
        "VITE_WORKSPACE_VAR": "WORKSPACE_VAR",
      }
    `)
  })

  it('should replace workspace env variables', () => {
    const workspaceEnv = loadWorkspaceEnv(mode)
    const cwdEnv = _loadEnv(mode, __dirname)
    expect(env.VITE_REPLACE_VAR).not.toBe(workspaceEnv.VITE_REPLACE_VAR)
    expect(env.VITE_REPLACE_VAR).toBe(cwdEnv.VITE_REPLACE_VAR)
  })
})
