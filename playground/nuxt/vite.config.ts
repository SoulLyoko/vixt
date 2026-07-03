import { build, loadNuxt } from 'nuxt'
import { writeTypes } from 'nuxt/kit'
import { defineConfig } from 'vite'

async function VitePluginNuxt() {
  const nuxt = await loadNuxt({})
  let viteConfig: import('vite').UserConfig = {}
  nuxt.hook('vite:configResolved', (config, { isClient }) => {
    if (isClient) {
      viteConfig = config
    }
  })
  await writeTypes(nuxt)
  await build(nuxt)
  const { devServer, appId, ssr, runtimeConfig } = nuxt.options
  return [
    {
      name: 'vite:nuxtconfig',
      enforce: 'pre',
      config() {
        const {
          logLevel,
          experimental,
          resolve,
          css,
          define,
          build,
          optimizeDeps,
          server,
          mode,
          publicDir,
          esbuild,
          clearScreen,
          cacheDir,
          customLogger,
        } = viteConfig
        return {
          logLevel,
          experimental,
          resolve,
          css,
          define: {
            ...define,
            __NUXT__: JSON.stringify({ appId, ssr, config: runtimeConfig }),
          },
          build,
          server: {
            port: devServer.port,
            host: devServer.host,
            watch: server?.watch,
            fs: server?.fs,
            warmup: server?.warmup,
            cors: server?.cors,
            // ...server,
          },
          mode,
          publicDir,
          optimizeDeps,
          esbuild,
          clearScreen,
          cacheDir,
          customLogger,
        }
      },
    } satisfies import('vite').Plugin,
    ...viteConfig.plugins ?? [],
  ]
}

export default defineConfig({
  plugins: [VitePluginNuxt()],
})
