import { defineVixtModule } from '@vixt/core'

const name = 'virtual:vixt:setup-layouts'
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
          const { defaultLayout = 'default' } = vixt.options.layouts ?? {}
          const setupLayoutCode = `import { createElement } from 'react'
import { layouts } from 'virtual:generated-layouts'

export function setupLayouts(routes) {
  return routes.map(route => {
    if (route.children?.length > 0) {
      route.children = setupLayouts(route.children)
    }
    if(route.element && route.meta?.layout !== false) {
      return {
        path: route.path,
        element: createElement(layouts[route.meta?.layout ?? '${defaultLayout}']),
        children: [{ ...route, path: '' }]
      }
    }
    return route
  });
}`
          return setupLayoutCode
        }
      },
    }
  },
})
