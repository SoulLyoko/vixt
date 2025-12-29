import { createJiti } from 'jiti'

interface Packages {
  'vixt/vue': typeof import('vixt/vue').default
  'vixt/uni': typeof import('vixt/uni').default
  'vixt/react': typeof import('vixt/react').default
  'vixt/vitepress': typeof import('vixt/vitepress').default
}

export default function importVixt<T extends keyof Packages>(packageName: T) {
  return createJiti(import.meta.url).import<Packages[T]>(packageName, { default: true })
}
