import fs from 'fs-extra'
import path from 'pathe'

fs.readdirSync('packages').forEach((dir) => {
  fs.removeSync(path.resolve('packages', dir, 'dist'))
})
