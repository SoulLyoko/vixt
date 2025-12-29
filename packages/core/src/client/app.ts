// @ts-ignore
export interface VixtApp {
  app: any
  appConfig: VixtAppConfig
  [key: string]: unknown
}

export interface CreateOptions {
  app: any
  appConfig: VixtAppConfig
}

export interface VixtAppConfig extends Record<string, any> {
  readonly baseURL?: string
  readonly rootId?: string
}

export function defineAppConfig(config: VixtAppConfig) {
  return config
}

export function useAppConfig() {
  return useVixtApp()?.appConfig ?? {}
}

export function useVixtApp(): VixtApp {
  // @ts-ignore
  return globalThis.useVixtApp?.()
}

export function createVixtApp(options: CreateOptions): VixtApp {
  const vixtApp = { ...options }

  // @ts-ignore
  globalThis.useVixtApp = () => vixtApp

  return vixtApp as VixtApp
}
