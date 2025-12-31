import { defineVitePlugin } from '@vixt/core'

export default defineVitePlugin(() => {
  return {
    name: 'vixt:config-patch',
    config(config) {
      const siteBase = config.vitepress?.userConfig?.base
      if (siteBase)
        return { base: siteBase }
    },
  }
})
