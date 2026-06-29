import process, { cwd } from 'node:process'
import url from 'node:url'

import { loadVixtConfig } from '@vixt/core'
import path from 'pathe'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
process.chdir(__dirname)

describe('config', () => {
  it('should assign default dirs', async () => {
    const result = await loadVixtConfig()
    expect(result.config.buildDir).toBe(path.resolve(cwd(), '.vixt'))
    expect(result.config.buildLayersDir).toBe(path.resolve(cwd(), '.vixt', 'layers'))
    expect(result.config.buildTypesDir).toBe(path.resolve(cwd(), '.vixt', 'types'))
    expect(result.config.modulesDir).toBe(path.resolve(cwd(), 'src', 'modules'))
    expect(result.config.pluginsDir).toBe(path.resolve(cwd(), 'src', 'plugins'))
    expect(result.config.rootDir).toBe(path.resolve(cwd()))
    expect(result.config.srcDir).toBe(path.resolve(cwd(), 'src'))
    expect(result.config.workspaceDir).toBe(path.resolve(cwd()))
    expect(result.configFile).toBe('vixt.config')
    expect(result.cwd).toBe(path.resolve(cwd()))
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
  })
})
