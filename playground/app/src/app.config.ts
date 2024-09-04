import { defineAppConfig } from 'vixt'

const env = import.meta.env
console.log('🚀 ~ env:', env)

export default defineAppConfig({
  name: 'app',
})
