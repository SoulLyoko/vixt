import { fileURLToPath } from 'node:url'

import { findUpWorkspaceDir, loadEnv, loadWorkspaceEnv } from '@vixt/core'
import path from 'pathe'
import { loadEnv as _loadEnv } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe('env', () => {
  const mode = 'development'
  const env = loadEnv(mode, __dirname)

  it ('should find workspace dir', () => {
    expect(findUpWorkspaceDir()).toBe(path.resolve(__dirname, '../../'))
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
