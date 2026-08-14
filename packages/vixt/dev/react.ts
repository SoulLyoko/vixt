import { createJiti } from 'jiti'

export default await createJiti(import.meta.url).import<typeof import('@vixt/react').default>(
  '@vixt/react',
  { default: true },
)
