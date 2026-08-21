import type { ExecSyncOptions } from 'node:child_process'

import { execSync } from 'node:child_process'
import path from 'node:path'
import url from 'node:url'

import fs from 'fs-extra'

import { version } from '../package.json'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const vixtVersion = `^${version}`

const projectName = 'test-project'
const genPath = path.join(__dirname, projectName)

function run(args: string[] = [], options?: ExecSyncOptions) {
  return execSync(`npx create-vixt ${args.join(' ')}`, { cwd: __dirname, ...options })
}

function getDepVersion(dir: string, name: string) {
  return fs.readJsonSync(path.join(dir, 'package.json'))?.dependencies?.[name]
}

beforeAll(() => fs.removeSync(genPath))
afterAll(() => fs.removeSync(genPath))

const isWatch = process.env.VITEST_MODE === 'WATCH'

describe.skipIf(isWatch)('create-vixt', () => {
  it('should create a monorepo by default', () => {
    run([projectName])
    expect(getDepVersion(genPath, 'vixt')).toBe(vixtVersion)
    expect(getDepVersion(path.join(genPath, 'packages/vue'), '@vixt/vue')).toBe(vixtVersion)
    expect(getDepVersion(path.join(genPath, 'packages/uni'), '@vixt/uni')).toBe(vixtVersion)
    expect(getDepVersion(path.join(genPath, 'packages/react'), '@vixt/react')).toBe(vixtVersion)
  })
})
