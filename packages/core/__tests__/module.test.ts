import type { Plugin } from 'vite'

import { defineVixtModule, installModule, loadVixt } from '@vixt/core'

describe('module', () => {
  const name = 'vixt:test-module'
  const configKey = 'testModule'
  const meta = { name, configKey }
  const defaults = { test: true }
  const module = defineVixtModule({
    meta,
    defaults,
    setup(options) {
      return { name, api: options }
    },
  })

  it('defineVixtModule', async () => {
    const vixt = await loadVixt()

    expect(module).toBeInstanceOf(Function)
    expect(module.getMeta).toBeInstanceOf(Function)
    expect(module.getOptions).toBeInstanceOf(Function)
    expect(module.getMeta!()).toEqual(meta)
    expect(module.getOptions!({}, vixt)).toEqual(defaults)
  })

  it('installModule', async () => {
    const vixt = await loadVixt({
      defaults: { [configKey]: { merged: true } },
    })
    const installedModule = installModule(module, {}, vixt) as Plugin

    expect(installedModule.name).toBe(name)
    expect(installedModule.api.test).toBeTruthy()
    expect(installedModule.api.merged).toBeTruthy()
  })
})
