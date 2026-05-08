import fs from 'fs-extra'
import path from 'pathe'
import { defineVixtConfig } from 'vixt'

const packagesDir = path.resolve('../packages')
const entryPoints = fs.readdirSync(packagesDir).map((pkg) => {
  const clientPath = path.join(packagesDir, pkg, '/src/client/index.ts')
  const nodePath = path.join(packagesDir, pkg, '/src/node/index.ts')
  const bothExists = fs.existsSync(clientPath) && fs.existsSync(nodePath)
  return bothExists ? [clientPath, nodePath] : []
}).flat()

export default defineVixtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: { vueTsc: true },
  },
  typedoc: {
    /** input */
    entryPoints,
    disableSources: true,
    name: 'vixt',
    readme: 'none',
    /** output */
    cleanOutputDir: true,
    out: 'api',
    /** other */
    skipErrorChecking: true,
    /** mardown */
    publicPath: `/api`,
    pageTitleTemplates: {
      member: '{name}',
    },
  },
})
