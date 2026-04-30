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

export interface VixtAppConfig {
  readonly baseURL?: string
  readonly rootId?: string
  [key: string]: any
}
