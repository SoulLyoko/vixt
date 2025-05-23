import { defineAppConfig } from 'vixt/client'

export default defineAppConfig({
  name: useEnv().VITE_APP_NAME,
})
