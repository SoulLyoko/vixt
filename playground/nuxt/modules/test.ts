import { addVitePlugin, defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'test-module',
  },
  setup(_, nuxt) {
    nuxt.hook('vite:extend', ({ config }) => {
      config.define ||= {}
      config.define['import.meta.env.TEST_MODULE1'] = true
    })
    addVitePlugin({
      name: 'test-module',
      config() {
        return {
          define: {
            'import.meta.env.TEST_MODULE2': true,
          },
        }
      },
    })
  },
})
