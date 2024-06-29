import { defineVitePlugin } from '@vixt/core'

/** 增加小程序中vueuse的运行所需 */
export function vueusePolyfill(code: string, id: string) {
  if (!id.endsWith('@dcloudio/uni-mp-vue/dist/vue.runtime.esm.js'))
    return code
  code += `
export const render = () => {}
export const TransitionGroup = {}
`
  return code
}

export const uniPatch = defineVitePlugin(() => {
  return {
    name: 'vixt:uni-patch',
    transform(code, id) {
      code = vueusePolyfill(code, id)
      return code
    },
  }
})
