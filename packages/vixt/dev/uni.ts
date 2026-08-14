import { createJiti } from 'jiti'

export default await createJiti(import.meta.url).import<typeof import('@vixt/uni').default>(
  '@vixt/uni',
  { default: true },
)
