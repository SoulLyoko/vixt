import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['vue', 'vue-router', 'pinia'],
})
