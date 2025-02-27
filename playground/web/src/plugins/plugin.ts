import { defineVixtPlugin } from 'vixt'

export default defineVixtPlugin(({ router }) => {
  console.log('web plugin loaded')
  router.beforeEach((to) => {
    if (to.path.startsWith('/__vitest_test__'))
      return '/'
  })
})
