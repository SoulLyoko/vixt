describe('verify vite version', () => {
  it('should be 7.x.x', async () => {
    const { version } = await import('vite')
    expect(version).toMatch(/^7\.\d+\.\d+/)
  })
})
