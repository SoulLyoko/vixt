import process from 'node:process'
import url from 'node:url'

import { loadVixt } from '@vixt/core'
import path from 'pathe'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
process.chdir(__dirname)

describe('vixt', () => {
  it('loadVixt', async () => {
    const vixt = await loadVixt()
    expect(vixt.options.rootDir).toBe(path.resolve(process.cwd()))
    expect(vixt.options.buildDir).toBe(path.resolve(process.cwd(), '.vixt'))
    expect(vixt.options.srcDir).toBe(path.resolve(process.cwd(), 'src'))
    expect(vixt).toMatchInlineSnapshot(`
      {
        "_layers": [],
        "_modules": [
          [Function],
          [Function],
          [Function],
          [Function],
          [Function],
          [Function],
          [Function],
          [Function],
          [Function],
        ],
        "options": {
          "buildDir": "C:/Project/vixt/packages/core/__tests__/.vixt",
          "buildImportsDir": "C:/Project/vixt/packages/core/__tests__/.vixt/imports",
          "buildLayersDir": "C:/Project/vixt/packages/core/__tests__/.vixt/layers",
          "buildTypesDir": "C:/Project/vixt/packages/core/__tests__/.vixt/types",
          "debug": false,
          "dev": true,
          "modulesDir": "C:/Project/vixt/packages/core/__tests__/src/modules",
          "pluginsDir": "C:/Project/vixt/packages/core/__tests__/src/plugins",
          "rootDir": "C:/Project/vixt/packages/core/__tests__",
          "srcDir": "C:/Project/vixt/packages/core/__tests__/src",
          "workspaceDir": "C:/Project/vixt/packages/core/__tests__",
        },
      }
    `)
  })
})
