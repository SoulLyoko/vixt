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
    expect(vixt).toMatchInlineSnapshot(`
      {
        "_layers": [],
        "_modules": [
          [Function],
          [Function],
        ],
        "options": {
          "buildDir": "C:/Project/vixt/packages/core/__tests__/.vixt",
          "buildImportsDir": "C:/Project/vixt/packages/core/__tests__/.vixt/imports",
          "buildLayersDir": "C:/Project/vixt/packages/core/__tests__/.vixt/layers",
          "buildTypesDir": "C:/Project/vixt/packages/core/__tests__/.vixt/types",
          "modules": [
            [Function],
            [Function],
          ],
          "rootDir": "C:/Project/vixt/packages/core/__tests__",
          "srcDir": "C:/Project/vixt/packages/core/__tests__/src",
        },
      }
    `)
  })
})
