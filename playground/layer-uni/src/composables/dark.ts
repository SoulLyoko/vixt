import type { BasicColorMode, BasicColorSchema } from '@vueuse/core'

function usePreferredDark() {
  const theme = uni.getSystemInfoSync().osTheme || uni.getSystemInfoSync().theme
  const preferredDark = ref(theme === 'dark')

  const callback: UniApp.OnThemeChangeCallback = ({ theme }) => {
    preferredDark.value = theme === 'dark'
  }
  uni.onThemeChange(callback)
  const stop = () => uni.offThemeChange(callback)
  tryOnScopeDispose(stop)

  return readonly(preferredDark)
}

function useColorMode() {
  const preferredDark = usePreferredDark()
  const system = computed(() => preferredDark.value ? 'dark' : 'light')
  const store = ref<BasicColorSchema>(uni.getStorageSync('vueuse-color-scheme') || 'auto')
  watch(store, v => uni.setStorageSync('vueuse-color-scheme', v))
  const state = computed<BasicColorMode>(() => store.value === 'auto' ? system.value : store.value)

  return Object.assign(store, { system, state })
}

export function useDark() {
  const mode = useColorMode()
  const isDark = computed<boolean>({
    get() {
      return mode.state.value === 'dark'
    },
    set(v) {
      const modeVal = v ? 'dark' : 'light'
      if (mode.system.value === modeVal)
        mode.value = 'auto'
      else
        mode.value = modeVal
    },
  })
  return Object.assign(isDark, { mode })
}

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
