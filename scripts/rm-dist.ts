import path from 'pathe'
import fs from 'fs-extra'

fs.readdirSync('packages').forEach((dir) => {
  fs.removeSync(path.resolve('packages', dir, 'dist'))
})
