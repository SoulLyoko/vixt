import { cwd } from 'node:process'

import { loadVixtConfig } from '@vixt/core'
import path from 'pathe'

describe('config', () => {
  it('should assign default dirs', async () => {
    const result = await loadVixtConfig()
    expect(result.config.rootDir).toBe(path.resolve(cwd()))
    expect(result.config.buildDir).toBe(path.resolve(cwd(), '.vixt'))
    expect(result.config.srcDir).toBe(path.resolve(cwd(), 'src'))
    expect(result).toMatchInlineSnapshot(`
      {
        "config": {
          "buildDir": "C:/Project/vixt/test/.vixt",
          "buildImportsDir": "C:/Project/vixt/test/.vixt/imports",
          "buildLayersDir": "C:/Project/vixt/test/.vixt/layers",
          "buildTypesDir": "C:/Project/vixt/test/.vixt/types",
          "rootDir": "C:/Project/vixt/test",
          "srcDir": "C:/Project/vixt/test/src",
        },
        "configFile": "vixt.config",
        "cwd": "C:/Project/vixt/test",
        "layers": [],
      }
    `)
  })

  it('should override dirs', async () => {
    const rootDir = path.resolve(cwd(), 'core')
    const buildDir = path.resolve(rootDir, '.test')
    const srcDir = path.resolve(rootDir, 'src')
    const result = await loadVixtConfig({
      defaults: { rootDir, buildDir, srcDir },
    })
    expect(result.config.rootDir).toBe(rootDir)
    expect(result.config.buildDir).toBe(buildDir)
    expect(result.config.srcDir).toBe(srcDir)
    expect(result).toMatchInlineSnapshot(`
      {
        "config": {
          "buildDir": "C:/Project/vixt/test/core/.test",
          "buildImportsDir": "C:/Project/vixt/test/core/.test/imports",
          "buildLayersDir": "C:/Project/vixt/test/core/.test/layers",
          "buildTypesDir": "C:/Project/vixt/test/core/.test/types",
          "rootDir": "C:/Project/vixt/test/core",
          "srcDir": "C:/Project/vixt/test/core/src",
        },
        "configFile": "vixt.config",
        "cwd": "C:/Project/vixt/test",
        "layers": [],
      }
    `)
  })
})
