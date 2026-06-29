import { page } from 'vitest/browser'

describe('test vue', () => {
  it('should override pages', async () => {
    await expect.element(page.getByTestId('page-index')).toBeDefined()
  })

  it('should override components', async () => {
    await expect.element(page.getByTestId('component-footer')).toBeDefined()
  })
})
