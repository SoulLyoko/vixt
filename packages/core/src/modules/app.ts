import type { Vixt } from '../types'

import path from 'pathe'
import fs from 'fs-extra'

import { defineVixtModule } from '../module'

// @ts-ignore
declare module '@vixt/core' {
  interface VixtOptions {
    app?: AppOptions
  }
}

type Property = Record<string, string>
export interface AppHead {
  meta?: Property[]
  link?: Property[]
  style?: Property[]
  script?: Property[]
  title?: Property[]
  noscript?: Property[]
}

export interface AppOptions {
  head?: AppHead
  /**
   * @default /
   */
  baseURL?: string
  /**
   * @default 'app'
   */
  rootId?: string
  /**
   * @default 'div'
   */
  rootTag?: string
  /** transform main.ts */
  transformMain?: (code: string, vixt: Vixt) => string | undefined
  css?: string[]
  /**
   * @default './loading.html'
   */
  loadingTemplate?: string
}

function resolveHeadTag(tag: string, attrs: Record<string, string>) {
  const attrsStr = Object.entries(attrs).filter(([k]) => k !== 'children').map(([k, v]) => `${k}="${v}"`).join(' ')
  return attrs?.children ? `<${tag} ${attrsStr}>${attrs.children}</${tag}>` : `<${tag} ${attrsStr} />`
}

function generateIndexHtml(options: AppOptions, vixt: Vixt) {
  const { buildDir, rootDir } = vixt.options

  fs.outputFileSync(path.resolve(rootDir!, 'index.html'), `<!-- Generated by Vixt -->\n<!-- This file transform from '${buildDir}/index.html' -->\n`)

  const { head = {}, rootTag, rootId } = options

  const headTemplate = (Object.entries(head) as [string, any[]][]).filter(([k]) => k !== 'noscript')
    .map(([tag, attrs]) => (attrs).map(e => resolveHeadTag(tag, e)))
    .flat()
    .join('\n')
  const noscriptTemplate = (Object.entries(head) as [string, any[]][]).filter(([k]) => k === 'noscript')
    .map(([tag, attrs]) => (attrs).map(e => resolveHeadTag(tag, e)))
    .flat()
    .join('\n')

  let { loadingTemplate } = options
  if (!loadingTemplate) {
    for (const layer of vixt._layers) {
      const loadingTemplatePath = path.resolve(layer.cwd!, 'loading.html')
      if (fs.existsSync(loadingTemplatePath)) {
        loadingTemplate = fs.readFileSync(loadingTemplatePath, 'utf-8')
        break
      }
    }
  }

  const code = `<!DOCTYPE html>
<html>
  <head>
${headTemplate}
  </head>
  <body>
    <${rootTag} id="${rootId}">
${loadingTemplate}
    </${rootTag}>
    <script type="module" src="/src/main.ts"></script>
${noscriptTemplate}
  </body>
</html>
`
  fs.outputFileSync(path.resolve(rootDir!, `${buildDir}/index.html`), code)
  return code
}

function generateMainTs(options: AppOptions, vixt: Vixt) {
  const { buildDir, rootDir } = vixt.options

  fs.outputFileSync(path.resolve(rootDir!, 'src', 'main.ts'), `// Generated by Vixt\n// This file transform from '${buildDir}/main.ts'\n`)

  const cssTemplate = options?.css?.map(css => `import '${css}'`).join('\n') ?? ''

  let appComponentImportTempate = ''
  let appConfigsImportTemplate = ''
  let appConfigsMergeTemplate = ''
  let pluginsImportTemplate = ''
  let pluginsMergeTemplate = ''
  vixt._layers.forEach((layer, i) => {
    // import App component
    const appComponentPath = path.resolve(layer.cwd!, 'src', 'App.vue')
    if (fs.existsSync(appComponentPath) && !appComponentImportTempate) {
      const appComponentRelativePath = `./${path.join(layer.meta!.relative!, 'App.vue')}`
      appComponentImportTempate = `import App from '${appComponentRelativePath}'`
    }

    // import and merge appConfigs
    const appConfigPath = `./${path.join(layer.meta!.relative!, 'app.config.ts')}`
    const appConfigsName = `__app_config__${i}`
    appConfigsImportTemplate += `const ${appConfigsName} = Object.values(import.meta.glob('${appConfigPath}', { import: 'default', eager: true }))[0]\n`
    appConfigsMergeTemplate += `${appConfigsName}, `

    // import and merge plugins
    const pluginsPath = `./${path.join(layer.meta!.relative!, 'plugins/*.ts')}`
    const pluginsName = `__plugins__${i}`
    pluginsImportTemplate += `const ${pluginsName} = Object.values(import.meta.glob('${pluginsPath}', { import: 'default', eager: true }))\n`
    pluginsMergeTemplate += `...${pluginsName}, `
  })

  let code = `// Generated by Vixt
// This file transform to 'src/main.ts'
// @ts-nocheck
${appComponentImportTempate}
${cssTemplate}
import { defu } from 'defu'

${appConfigsImportTemplate}
${pluginsImportTemplate}
const appConfig = defu(${appConfigsMergeTemplate}{})
const plugins = [${pluginsMergeTemplate}].reverse()
`

  code = options.transformMain?.(code, vixt) || code

  fs.outputFileSync(path.resolve(rootDir!, buildDir!, 'main.ts'), code)
  return code
}

const name = 'vixt:app'
const defaults: AppOptions = {
  rootId: 'app',
  rootTag: 'div',
  baseURL: '/',
  css: [],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    noscript: [{ children: 'This website requires JavaScript to function properly. Please enable JavaScript to continue.' }],
  },
}
export const app = defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults,
  setup(options, vixt) {
    let indexHtmlCode: string
    let mainTsCode: string
    return {
      name,
      configResolved() {
        indexHtmlCode = generateIndexHtml(options, vixt)
        mainTsCode = generateMainTs(options, vixt)
      },
      transformIndexHtml: {
        order: 'pre',
        handler() {
          return indexHtmlCode
        },
      },
      transform: {
        order: 'pre',
        handler(_, id) {
          if (!id.includes('/src/main.ts'))
            return
          return mainTsCode
        },
      },
    }
  },
})
