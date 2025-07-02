import { patchUnocss } from '@vixt/core'
import fs from 'fs-extra'

describe('patch', () => {
  it('patchUnocss', () => {
    patchUnocss()
    const content = fs.readFileSync('node_modules/@unocss/vite/dist/index.mjs', 'utf-8')
    expect(content.includes(`const result = await cssPlugins.get(dir).transform.call(ctx2, css, id);`)).toBeFalsy()
  })
})
