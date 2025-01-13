import { cwd } from 'node:process'

import { loadVixt } from '@vixt/core'
import path from 'pathe'

describe('vixt', () => {
  it('loadVixt', async () => {
    const vixt = await loadVixt()
    expect(vixt.options.rootDir).toBe(path.resolve(cwd()))
    expect(vixt).toMatchInlineSnapshot(`
      {
        "_layers": [],
        "_modules": [
          [Function],
          [Function],
        ],
        "options": {
          "buildDir": "C:/Project/vixt/test/.vixt",
          "buildImportsDir": "C:/Project/vixt/test/.vixt/imports",
          "buildLayersDir": "C:/Project/vixt/test/.vixt/layers",
          "buildTypesDir": "C:/Project/vixt/test/.vixt/types",
          "modules": [
            [Function],
            [Function],
          ],
          "rootDir": "C:/Project/vixt/test",
          "srcDir": "C:/Project/vixt/test/src",
        },
      }
    `)
  })
})
