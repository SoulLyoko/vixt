import { defineHandler, getRouterParams } from 'nitro/h3'

function sleep(ms?: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * GET /mock?key=
 */
export default defineHandler(async (event) => {
  const { key } = getRouterParams(event)
  await sleep(1000)
  return {
    code: 200,
    data: key,
  }
})
