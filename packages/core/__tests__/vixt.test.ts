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
    expect(vixt.options.debug).toBeFalsy()
    expect(vixt.options.dev).toBeTruthy()
    expect(vixt.options.test).toBeTruthy()
  })
})
