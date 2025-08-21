import process, { cwd } from 'node:process'
import url from 'node:url'

import { loadVixtConfig } from '@vixt/core'
import path from 'pathe'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
process.chdir(__dirname)

describe('config', () => {
  it('should assign default dirs', async () => {
    const result = await loadVixtConfig()
    expect(result.config.rootDir).toBe(path.resolve(cwd()))
    expect(result.config.buildDir).toBe(path.resolve(cwd(), '.vixt'))
    expect(result.config.srcDir).toBe(path.resolve(cwd(), 'src'))
    expect(result).toMatchInlineSnapshot(`
      {
        "_configFile": undefined,
        "config": {
          "buildDir": "C:/Project/vixt/packages/core/__tests__/.vixt",
          "buildImportsDir": "C:/Project/vixt/packages/core/__tests__/.vixt/imports",
          "buildLayersDir": "C:/Project/vixt/packages/core/__tests__/.vixt/layers",
          "buildTypesDir": "C:/Project/vixt/packages/core/__tests__/.vixt/types",
          "rootDir": "C:/Project/vixt/packages/core/__tests__",
          "srcDir": "C:/Project/vixt/packages/core/__tests__/src",
        },
        "configFile": "vixt.config",
        "cwd": "C:/Project/vixt/packages/core/__tests__",
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
        "_configFile": undefined,
        "config": {
          "buildDir": "C:/Project/vixt/packages/core/__tests__/core/.test",
          "buildImportsDir": "C:/Project/vixt/packages/core/__tests__/core/.test/imports",
          "buildLayersDir": "C:/Project/vixt/packages/core/__tests__/core/.test/layers",
          "buildTypesDir": "C:/Project/vixt/packages/core/__tests__/core/.test/types",
          "rootDir": "C:/Project/vixt/packages/core/__tests__/core",
          "srcDir": "C:/Project/vixt/packages/core/__tests__/core/src",
        },
        "configFile": "vixt.config",
        "cwd": "C:/Project/vixt/packages/core/__tests__",
        "layers": [],
      }
    `)
  })
})
