import { defineVixtModule } from '../module'

const name = 'virtual:vixt:css'
const virtualModuleId = name
const resolvedVirtualModuleId = `\0${virtualModuleId}`
export default defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    return {
      name,
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          const cssTemplate = vixt.options.app?.css?.map(css => `import '${css}'`).join('\n') ?? ''
          return cssTemplate
        }
      },
    }
  },
})
