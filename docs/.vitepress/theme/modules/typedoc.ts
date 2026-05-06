import type { DefaultTheme } from 'vitepress'

import { cwd } from 'node:process'

import fs from 'fs-extra'
import path from 'pathe'
import { debounce } from 'perfect-debounce'
import * as typedoc from 'typedoc'
import { defineVixtModule } from 'vixt'

import typeDocOptions, { packages, typeDocDir } from '../../../typedoc.config'

const sourceDirs = packages.map(e => path.resolve(cwd(), `../packages/${e}/src`))

function generateTypeDocTsConfig() {
  const tsConfig = {
    extends: './tsconfig.json',
    include: sourceDirs,
  }
  fs.writeJSONSync(path.resolve(cwd(), '.vixt/typedoc.tsconfig.json'), tsConfig, { spaces: 2 })
}

const name = 'vixt:typedoc'
export default defineVixtModule({
  meta: { name },
  async setup() {
    generateTypeDocTsConfig()
    const app = await typedoc.Application.bootstrapWithPlugins(typeDocOptions)
    async function generate() {
      const project = await app.convert()
      if (project) {
        await app.generateOutputs(project)
      }
    }
    await generate()
    app.options.setValue('cleanOutputDir', false)
    const generateDebounced = debounce(generate, 100)

    return {
      name,
      enforce: 'post',
      config(config) {
        const sidebar: DefaultTheme.SidebarItem[] = fs.readJSONSync(path.resolve(cwd(), typeDocDir, 'typedoc-sidebar.json'))
        sidebar.forEach((item) => {
          item.collapsed = undefined
          if (item.text !== 'core')
            item.items = item.items?.map(e => e.items ?? []).flat()
        })
        config.vitepress!.userConfig!.themeConfig ??= {}
        config.vitepress!.userConfig!.themeConfig!.sidebar ??= {}
        config.vitepress!.userConfig!.themeConfig!.sidebar![`/${typeDocDir}`] = sidebar
      },
      configureServer(server) {
        server.watcher.add(sourceDirs)
      },
      async handleHotUpdate(ctx) {
        if (sourceDirs.some(e => ctx.file.includes(e))) {
          await generateDebounced()
          ctx.server.ws.send({ type: 'full-reload' })
        }
      },
    }
  },
})

declare module 'vite' {
  interface UserConfig {
    vitepress?: import('vitepress').SiteConfig
  }
}
