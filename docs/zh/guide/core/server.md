# 服务端

服务端由 [Nitro](https://github.com/nitrojs/nitro) 提供支持

## 启用 Nitro

默认情况下，nitro是禁用的，你可以通过配置`nitro.enabled`来启用它

::: code-group

```ts [vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  nitro: {
    enabled: true
    // serverDir: './server' // 默认为'./server'
  }
})
```

:::

## 编写服务端接口

::: code-group

```ts [server/routes/test.ts]
export default defineEventHandler(() => {
  return 'Hello World!'
})
```

:::

## 客户端访问接口

::: code-group

```vue [src/pages/index.vue]
<script setup lang="ts">
// vixt自动导入ofetch的$fetch函数，并提供类型定义
$fetch('/test').then((res) => {
  console.log(res) // 'Hello World!'
})
</script>
```

:::

## 部署应用

nitro提供任意服务器和边缘网络的部署支持，查看[Nitro部署](https://nitro.build/deploy)了解更多有关信息

以下是使用Vixt实现部署到其中三个服务提供商的示例：

- [Cloudflare](https://vixt.soullyoko.workers.dev/)
- [Netlify](https://vixt.netlify.app/)
- [Vercel](https://vixt.vercel.app/)
