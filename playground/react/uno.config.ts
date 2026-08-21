import type { AttributifyAttributes } from '@unocss/preset-attributify'

export { default } from '@vixt/layer-shared/uno.config.ts'

declare module 'react' {
  // @ts-ignore
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
