# Plugins

Vixt automatically scans and executes all plugins in the `plugins` folder after `createApp`.

## Create a plugin

:::code-group

```ts [plugins/my-plugin.ts]
interface PluginOptions {
  enabled?: boolean
}

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    myPluginOptions?: PluginOptions
  }
}

export default defineVixtPlugin({
  name: 'my-plugin',
  setup(vixt) {
    console.log(vixt) // { app, router, routes, pinia, appConfig }
  }
})
```

:::
