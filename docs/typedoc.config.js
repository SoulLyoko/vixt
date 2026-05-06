// @ts-check
export const typeDocDir = 'api'
export const packages = ['core', 'react', 'uni', 'vitepress', 'vue']

const entryPoints = packages
  .map((pkg) => {
    return [`../packages/${pkg}/src/client/index.ts`, `../packages/${pkg}/src/node/index.ts`]
  })
  .flat()

/**
 * @type {import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').PluginOptions }
 */
export default {
  /** Configuration */
  plugin: ['typedoc-plugin-markdown', 'typedoc-vitepress-theme'],
  tsconfig: './.vixt/typedoc.tsconfig.json',
  /** input */
  entryPoints,
  disableSources: true,
  name: 'vixt',
  readme: 'none',
  /** output */
  cleanOutputDir: true,
  out: typeDocDir,
  /** other */
  skipErrorChecking: true,
  /** mardown */
  publicPath: `/${typeDocDir}`,
  pageTitleTemplates: {
    member: '{name}',
  },
}
