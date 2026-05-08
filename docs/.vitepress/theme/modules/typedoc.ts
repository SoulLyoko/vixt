import type { TypeDocOptions } from 'typedoc'
import type { PluginOptions as TypeDocMardownOptions } from 'typedoc-plugin-markdown'
import type { DefaultTheme } from 'vitepress'

import { cwd } from 'node:process'

import fs from 'fs-extra'
import path from 'pathe'
import { debounce } from 'perfect-debounce'
import * as typedoc from 'typedoc'
import { defineVixtModule } from 'vixt'

const name = 'vixt:typedoc'
export default defineVixtModule<ModuleOptions>({
  meta: { name, configKey: 'typedoc' },
  defaults: {
    /** Configuration */
    plugin: ['typedoc-plugin-markdown', 'typedoc-vitepress-theme'],
    tsconfig: '.vixt/typedoc.tsconfig.json',
  },
  async setup(options) {
    // write `typedoc.tsconfig.json`
    const sourceDirs = [...new Set(options.entryPoints!.map(e => e.slice(0, e.indexOf('src') + 3)))]
    const tsConfig = { extends: './tsconfig.json', include: sourceDirs }
    fs.writeJSONSync(path.resolve(cwd(), options.tsconfig!), tsConfig, { spaces: 2 })

    // generate api docs
    const app = await typedoc.Application.bootstrapWithPlugins(options)
    async function generate() {
      const project = await app.convert()
      if (project) {
        await app.generateOutputs(project)
      }
    }
    await generate()
    app.options.setValue('cleanOutputDir', false) // for HMR
    const generateDebounced = debounce(generate, 100)

    return {
      name,
      enforce: 'post',
      config(config) {
        const sidebar: DefaultTheme.SidebarItem[] = fs.readJSONSync(path.resolve(cwd(), 'api', 'typedoc-sidebar.json'))
        sidebar.forEach((item) => {
          item.collapsed = undefined
          if (item.text !== 'core')
            item.items = item.items?.map(e => e.items ?? []).flat()
        })
        config.vitepress!.userConfig!.themeConfig ??= {}
        config.vitepress!.userConfig!.themeConfig!.sidebar ??= {}
        config.vitepress!.userConfig!.themeConfig!.sidebar!['/api'] = sidebar
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

declare module '@vixt/core' {
  interface VixtOptions {
    typedoc?: ModuleOptions
  }
}

interface ModuleOptions extends TypeDocOptions, TypeDocMardownOptions {}
