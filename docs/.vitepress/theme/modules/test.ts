import { defineVixtModule } from 'vixt'

const name = 'vixt:docs-test-module'
export default defineVixtModule({
  meta: { name: 'vixt:docs-test-module' },
  setup() {
    return {
      name,
      config(config) {
        console.log(config.vitepress !== undefined)
      },
    }
  },
})
