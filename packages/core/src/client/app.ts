import type { CreateOptions, VixtApp, VixtAppConfig } from './types'

/**
 * Define the app config.
 * @example
 * ```ts
 * // src/app.config.ts
 * export default defineAppConfig({
 *   title: 'My Vixt App',
 *   description: 'A Vixt App',
 * })
 * ```
 */
export function defineAppConfig(config: VixtAppConfig) {
  return config
}

/** Access the app config defined in the project. */
export function useAppConfig() {
  return useVixtApp()?.appConfig ?? {}
}

/** Create a Vixt App instance. */
export function createVixtApp(options: CreateOptions): VixtApp {
  const vixtApp = { ...options }

  // @ts-ignore
  globalThis.useVixtApp = () => vixtApp

  return vixtApp as VixtApp
}

/** Access the shared runtime context of the Vixt Application. */
export function useVixtApp(): VixtApp {
  // @ts-ignore
  return globalThis.useVixtApp?.()
}
