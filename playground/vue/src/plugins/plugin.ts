import { defineVixtPlugin } from '@vixt/core/client'

export default defineVixtPlugin(({ router }) => {
  console.log('vue plugin loaded')
  router.beforeEach((to) => {
    if (to.path.startsWith('/__vitest_test__'))
      return '/'
  })
})
