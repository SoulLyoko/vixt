# Layers

A layer has the same structure as a normal Vixt project. Inheriting layers will reuse components, utilities, configuration, and more from the layer, making layers reusable and improving developer productivity.

## Using layers

### Local layers

Assume a monorepo structure like this. Both the `web` and `app` projects inherit the Vixt configuration from `layer-shared`.

:::code-group

```[directory]
-| packages/
---| layer-shared/
-----| src/
-----| vixt.config.ts
---| web/
-----| src/
-----| vixt.config.ts
---| app/
-----| src/
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

### Remote layers

A valid npm package can also be used as a layer, as long as the package entry points to a `vixt.config.ts` file.

:::code-group

```json{4} [@vixt/layer-shared/package.json]
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

### Layer inheritance

Layers can inherit other layers to form more complex inheritance relationships.

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
  // or inherit multiple layers
  // extends: ['../layer-web', '../layer-other'],
})
```

:::
