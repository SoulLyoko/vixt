import { buildCommand } from './build'
import { cleanupCommand } from './cleanup'
import { devCommand } from './dev'
import { prepareCommand } from './prepare'
import { previewCommand } from './preview'

export * from './build'
export * from './cleanup'
export * from './dev'
export * from './prepare'
export * from './preview'

export const commands = {
  build: buildCommand,
  cleanup: cleanupCommand,
  dev: devCommand,
  prepare: prepareCommand,
  preview: previewCommand,
}
