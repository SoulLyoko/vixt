import fs from 'node:fs'

describe('build', () => {
  const packages = fs.readdirSync('packages')
  for (const pkg of packages) {
    const path = `packages/${pkg}/dist`
    it.skipIf(!fs.existsSync(path))(`${pkg} build snapshot`, () => {
      const attachments = fs.readdirSync(path, { recursive: true }).toSorted()
      expect(attachments).matchSnapshot()
    })
  }
})
