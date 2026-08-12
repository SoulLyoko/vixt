import { defineHandler } from 'void'

export const ssr = false
export const prerender = false

export const loader = defineHandler(async () => {
  return { title: 'Dashboard' }
})
