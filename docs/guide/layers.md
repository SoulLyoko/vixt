# 层

层的结构与普通的Vixt项目相同，继承层将会复用层内的组件、函数、配置等，这使得层可以作为一个可复用的项目，提高开发效率。

## 层的使用

### 本地层

假设monorepo中是这样一个结构，那么 `web` 项目和 `app` 项目都将继承 `layer-shared` 的vixt配置

:::code-group

```[目录结构]
-| packages/
---| layer-shared
-----| src
-----| vixt.config.ts
---| web
-----| src
-----| vixt.config.ts
---| app
-----| src
-----| vixt.config.ts
```

```ts [layer-shared/vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  meta: { name: 'layer-shared' },
  typescript: {
    typeCheck: { vueTsc: true },
  },
})
```

```ts [web/vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  extends: ['../layer-shared'],
})
```

```ts [app/vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  extends: ['../layer-shared'],
})
```

:::

### 远程层

合法的npm包也可以作为层来使用，只需将层的vixt.config.ts文件作为包入口即可

:::code-group

```json [@vixt/layer-shared/package.json]
{
  "name": "@vixt/layer-shared",
  "type": "module",
  "main": "vixt.config.ts",
  "devDependencies": {
    "vixt": "latest"
  }
}
```

```json [web/package.json]
{
  "name": "web",
  "type": "module",
  "dependencies": {
    "vixt": "latest",
    "@vixt/layer-shared": "latest"
  }
}
```

```ts [web/vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  extends: ['@vixt/layer-shared'],
})
```

:::

### 层继承层

层也可以继承层，从而实现更复杂的继承关系

:::code-group

```ts [layer-shared/vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  meta: { name: 'layer-shared' },
  typescript: {
    typeCheck: { vueTsc: true },
  },
})
```

```ts [layer-web/vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  meta: { name: 'layer-web' },
  extends: ['../layer-shared'],
  devtools: { enabled: true }
})
```

```ts [web/vixt.config.ts]
import { defineVixtConfig } from 'vixt'

export default defineVixtConfig({
  extends: ['../layer-web'],
  // 或者继承多个层
  // extends: ['../layer-web', '../layer-other'],
})
```

:::
