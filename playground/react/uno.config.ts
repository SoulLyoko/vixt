import type { AttributifyAttributes } from '@unocss/preset-attributify'

export { default } from '../layer-shared/uno.config'

declare module 'react' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
