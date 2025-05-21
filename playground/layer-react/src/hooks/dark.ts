import type { UseDarkOptions } from '@reactuses/core'

import { useDarkMode } from '@reactuses/core'

export function useDark(options?: Partial<UseDarkOptions>) {
  return useDarkMode({ classNameDark: 'dark', classNameLight: '', ...options })
}
