import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'

/**
 * compatible unocss v66.0.0 to vite v7.0.0
 * `[unocss:global:build:scan] cssPlugins.get(...).transform.call is not a function`
 */
export function patchUnocss() {
  const filePath = resolvePathSync('@unocss/vite')
  let fileContent = fs.readFileSync(filePath, 'utf-8')
  if (fileContent.includes(`const result = await cssPlugins.get(dir).transform.call(ctx2, css, id);`)) {
    fileContent = fileContent.replace(
      `const result = await cssPlugins.get(dir).transform.call(ctx2, css, id);`,
      `const cssPlugin = cssPlugins.get(dir);
    const cssPluginTransformHandler = "handler" in cssPlugin.transform ? cssPlugin.transform.handler : cssPlugin.transform;
    const result = await cssPluginTransformHandler.call(ctx2, css, id);`,
    )
    fs.writeFileSync(filePath, fileContent)
  }
}
