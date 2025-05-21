import { defineAppConfig } from 'vixt/client'

const env = useEnv()
console.log('env:', env)

export default defineAppConfig({
  name: env.VITE_APP_NAME,
})
