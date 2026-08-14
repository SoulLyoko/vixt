import type { AttributifyAttributes } from '@unocss/preset-attributify'

export { default } from '../layer-shared/uno.config'

declare module 'react' {
  // @ts-ignore
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
