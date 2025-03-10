import { defineVixtModule } from '@vixt/core'

describe('module', () => {
  it('defineVixtModule return', () => {
    const module = defineVixtModule({})

    expect(module).toBeInstanceOf(Function)
    expect(module.getMeta).toBeInstanceOf(Function)
    expect(module.getOptions).toBeInstanceOf(Function)
  })
})
