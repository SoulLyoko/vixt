// @ts-ignore
export interface VixtApp {
  appConfig: VixtAppConfig
}

export interface VixtAppConfig extends Record<string, any> {}

export function defineAppConfig(config: VixtAppConfig) {
  return config
}
