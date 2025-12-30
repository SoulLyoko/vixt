/* eslint-disable antfu/no-top-level-await */
import { createJiti } from 'jiti'

export default await createJiti(import.meta.url).import<typeof import('@vixt/vue').default>('@vixt/vue', { default: true })
