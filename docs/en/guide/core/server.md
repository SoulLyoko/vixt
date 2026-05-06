# Server

The server is powered by [Nitro](https://github.com/nitrojs/nitro).

## Enable Nitro

Nitro is disabled by default. You can enable it by configuring `nitro.enabled`.

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  nitro: {
    enabled: true
    // serverDir: './server' // defaults to './server'
  }
})
```

:::

## Write server APIs

::: code-group

```ts [server/routes/test.ts]
export default defineEventHandler(() => {
  return 'Hello World!'
})
```

:::

## Call APIs from the client

::: code-group

```vue [src/pages/index.vue]
<script setup lang="ts">
// Vixt auto-imports the $fetch function from ofetch and provides types
$fetch('/test').then((res) => {
  console.log(res) // 'Hello World!'
})
</script>
```

:::

## Deploy your app

Nitro supports deployment to any server or edge network. Check [Nitro Deploy](https://nitro.build/deploy) for more information.

Here are examples of deploying with Vixt to three providers:

- [Cloudflare](https://vixt.soullyoko.workers.dev/)
- [Netlify](https://vixt.netlify.app/)
- [Vercel](https://vixt.vercel.app/)
