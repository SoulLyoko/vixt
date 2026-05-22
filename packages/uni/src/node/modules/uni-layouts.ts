import { parse } from 'node:path'
import { cwd } from 'node:process'

import { camelCase, kebabCase, pascalCase } from '@uni-helper/vite-plugin-uni-components'
import { defineVitePlugin } from '@vixt/core'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'

export interface UniLayoutsOptions {
  /**
   * Relative path to the directory to search for page components.
   * @default ['src/layouts']
   */
  layoutsDirs?: string[]
  /**
   * List of path globs to exclude when resolving pages.
   */
  exclude?: string[]
  /**
   * Filename of default layout (".vue" is not needed)
   * @default 'default'
   */
  defaultLayout?: string
}

/** 从插件中返回ctx */
function patchUniLayouts() {
  const matched = `name: "vite-plugin-uni-layouts"`
  const replaced = `ctx,name: "vite-plugin-uni-layouts"`
  const codePath = resolvePathSync('@uni-helper/vite-plugin-uni-layouts')
  let code = fs.readFileSync(codePath, 'utf-8')
  if (!code.includes(replaced)) {
    code = code.replace(matched, replaced)
    fs.writeFileSync(codePath, code)
  }
}

function scanLayoutsDirs(dirs: string[], exclude: string[] = []) {
  const files = fg.sync(dirs.map(c => `${c}/**/*.vue`), {
    ignore: ['node_modules', '.git', ...exclude],
    onlyFiles: true,
    cwd: cwd(),
    absolute: true,
  })

  return files
}

/**
 * @return kebabCase
 */
function getNameFromFilePath(filePath: string, dirs: string[]) {
  const parsedFilePath = parse(filePath)

  let strippedPath = ''
  for (const dir of dirs) {
    if (parsedFilePath.dir.startsWith(dir)) {
      strippedPath = parsedFilePath.dir.slice(dir.length)
      break
    }
  }
  const folders = strippedPath.slice(1).split('/').filter(Boolean)

  let filename = parsedFilePath.name
  if (filename === 'index')
    filename = ''

  const namespaced = [...folders, filename]
  filename = namespaced.filter(Boolean).join('-')

  return filename
}

interface LayoutInfo {
  path: string
  name: string
  pascalName: string
  kebabName: string
}
function getLayouts(files: string[], dirs: string[]) {
  const layoutsMap: Record<string, LayoutInfo> = { }
  files.forEach((file) => {
    const name = getNameFromFilePath(file, dirs)
    const layoutInfo = {
      path: file,
      name: camelCase(name),
      pascalName: pascalCase(name),
      kebabName: kebabCase(name),
    }
    layoutsMap[name] = layoutInfo
  })
  const layouts = Object.values(layoutsMap)
  return layouts
}

export default defineVitePlugin<UniLayoutsOptions>(async (options) => {
  patchUniLayouts()
  const UniLayouts = await import('@uni-helper/vite-plugin-uni-layouts').then(m => m.default)

  const { layoutsDirs = ['src/layouts'], defaultLayout = 'default', exclude = [] } = options ?? {}
  const plugin = UniLayouts({ layout: defaultLayout })
  const pluginCtx = (plugin as any).ctx
  if (pluginCtx) {
    const files = scanLayoutsDirs(layoutsDirs, exclude)
    pluginCtx.layouts = getLayouts(files, layoutsDirs)
  }

  return plugin
})
