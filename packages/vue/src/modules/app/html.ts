import type { AppOptions } from './types'
import type { Vixt } from '@vixt/core'

import fs from 'fs-extra'
import path from 'pathe'

function resolveHeadTag(tag: string, attrs: Record<string, string>) {
  const attrsStr = Object.entries(attrs).filter(([k]) => k !== 'children').map(([k, v]) => `${k}="${v}"`).join(' ')
  return attrs?.children ? `<${tag} ${attrsStr}>${attrs.children}</${tag}>` : `<${tag} ${attrsStr} />`
}

export function generateIndexHtml(options: AppOptions, vixt: Vixt) {
  const { buildDir, buildDirName, rootDir, srcDirName } = vixt.options

  const indexHtmlPath = path.resolve(rootDir!, 'index.html')
  if (!fs.existsSync(indexHtmlPath))
    fs.outputFileSync(indexHtmlPath, `<!-- Generated by Vixt -->\n<!-- This file transform from '${buildDirName}/index.html' -->\n`)

  const { head = {}, rootTag, rootId } = options

  const headTemplate = (Object.entries(head) as [string, any[]][]).filter(([k]) => k !== 'noscript').map(([tag, attrs]) => attrs.map(e => resolveHeadTag(tag, e))).flat().join('\n')
  const noscriptTemplate = (Object.entries(head) as [string, any[]][]).filter(([k]) => k === 'noscript').map(([tag, attrs]) => attrs.map(e => resolveHeadTag(tag, e))).flat().join('\n')

  let { loadingTemplate = '' } = options
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
    <script type="module" src="/${srcDirName}/main.ts"></script>
${noscriptTemplate}
  </body>
</html>
`
  fs.outputFileSync(path.resolve(buildDir!, 'index.html'), code)
  return code
}
