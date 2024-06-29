#!/usr/bin/env
import { argv } from 'node:process'
import { execSync } from 'node:child_process'

import { resolvePathSync } from 'mlly'
import path from 'pathe'

const uni = path.resolve(resolvePathSync('@dcloudio/vite-plugin-uni'), '../../bin/uni.js')

const args = argv.slice(2).join(' ')

execSync(`node --import=tsx ${uni} ${args} `, { stdio: 'inherit' })
