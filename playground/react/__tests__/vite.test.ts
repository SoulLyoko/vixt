describe('verify vite version', () => {
  it('should be 8.x.x', async () => {
    const { version } = await import('vite')
    console.log('🚀 ~ version:', version)
    expect(version).toMatch(/^8\.\d+\.\d+/)
  })
})
