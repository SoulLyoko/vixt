#!/usr/bin/env
import { argv } from 'node:process'
import { execSync } from 'node:child_process'

import { resolvePathSync } from 'mlly'
import path from 'pathe'
// import { createServer, build as viteBuild, preview as vitePreview } from 'vite'

const vite = path.resolve(resolvePathSync('vite'), '../../../bin/vite.js')

const args = argv.slice(2).join(' ')

execSync(`node --import=tsx ${vite} ${args} `, { stdio: 'inherit' })

// async function start() {
//   const server = await createServer({
//     configFile: './vite.config.ts',
//   })

//   await server.listen()

//   server.printUrls()
// }

// async function build() {
//   await viteBuild({
//     configFile: './vite.config.ts',
//   })
// }

// async function preview() {
//   const server = await vitePreview({
//     configFile: './vite.config.ts',
//   })

//   server.printUrls()
//   server.bindCLIShortcuts({ print: true })
// }

// await start()
