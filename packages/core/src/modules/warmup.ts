import { defineVixtModule } from '..'

// @ts-ignore
declare module '@vixt/core' {
  interface VixtOptions {
    warmup?: WarmupOptions
  }
}

export interface WarmupOptions {
  enabled?: boolean
  /**
   * The files to be transformed and used on the client-side. Supports glob patterns.
   */
  clientFiles?: string[]
  /**
   * The files to be transformed and used in SSR. Supports glob patterns.
   */
  ssrFiles?: string[]
}

const defaults: WarmupOptions = {
  enabled: true,
  clientFiles: ['./index.html', './src/**/*.vue', './src/**/*.ts', './src/**/*.tsx'],
  ssrFiles: ['./index.html', './src/**/*.vue', './src/**/*.ts', './src/**/*.tsx'],
}

const name = 'vixt:warmup'
export const warmup = defineVixtModule<WarmupOptions>({
  meta: { name, configKey: 'warmup' },
  defaults,
  setup(options) {
    return {
      name,
      config() {
        if (!options.enabled)
          return
        return {
          server: {
            warmup: options,
          },
        }
      },
    }
  },
})
