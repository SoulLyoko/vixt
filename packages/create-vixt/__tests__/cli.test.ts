import type { SyncOptions } from 'execa'

import path from 'node:path'
import url from 'node:url'

import { execaCommandSync } from 'execa'
import fs from 'fs-extra'

import { version } from '../../../package.json'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const vixtVersion = `^${version}`

const projectName = 'test-project'
const genPath = path.join(__dirname, projectName)
const cliPath = path.join(__dirname, '..')

function run(args: string[] = [], options?: SyncOptions) {
  return execaCommandSync(`node ${cliPath} ${args.join(' ')}`, { cwd: __dirname, ...options })
}

function getVixtDepVersion(dir: string) {
  return fs.readJsonSync(path.join(dir, 'package.json'))?.dependencies?.vixt
}

beforeAll(() => fs.removeSync(genPath))
afterEach(() => fs.removeSync(genPath))

const isWatch = process.env.VITEST_MODE === 'WATCH'

describe.skipIf(isWatch)('create-vixt', () => {
  it('should create a monorepo by default', () => {
    run([projectName])
    expect(getVixtDepVersion(genPath)).toBe(vixtVersion)
    expect(getVixtDepVersion(path.join(genPath, 'packages/vue'))).toBeUndefined()
    expect(getVixtDepVersion(path.join(genPath, 'packages/uni'))).toBeUndefined()
    expect(getVixtDepVersion(path.join(genPath, 'packages/react'))).toBeUndefined()
  })

  it('should create vue project', () => {
    run([projectName, '--template', 'vue-ts'])
    expect(getVixtDepVersion(genPath)).toBe(vixtVersion)
  })

  it('should create uni project', () => {
    run([projectName, '--template', 'uni-ts'])
    expect(getVixtDepVersion(genPath)).toBe(vixtVersion)
  })

  it('should create react project', () => {
    run([projectName, '--template', 'react-ts'])
    expect(getVixtDepVersion(genPath)).toBe(vixtVersion)
  })
})
