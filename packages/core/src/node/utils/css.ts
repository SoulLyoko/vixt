import type { AppOptions } from '../app'

export function generateCss(options: AppOptions) {
  const cssTemplate = options?.css?.map(css => `import '${css}'`).join('\n') ?? ''
  return cssTemplate
}
