import { page } from 'vite-plus/test/browser'

describe('test vue', () => {
  it('should override pages', async () => {
    await expect.element(page.getByTestId('page-index')).toBeInTheDocument()
  })

  it('should override components', async () => {
    await expect.element(page.getByTestId('component-footer')).toBeInTheDocument()
  })
})
