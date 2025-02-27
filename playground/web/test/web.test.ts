import { page } from '@vitest/browser/context'

describe('test web', async () => {
  it('should override pages', async () => {
    await expect.element(page.getByTestId('page-index')).toBeDefined()
  })

  it('should override components', async () => {
    await expect.element(page.getByTestId('component-footer')).toBeDefined()
  })
})
