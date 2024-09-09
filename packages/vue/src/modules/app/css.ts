import type { AppOptions } from './types'

export function generateCss(options: AppOptions) {
  const cssTemplate = options?.css?.map(css => `import '${css}'`).join('\n') ?? ''
  return cssTemplate
}
