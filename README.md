# Vixt

[../.vixt/main.ts](../.vixt/main.ts)

## Usage

```bash
pnpm i vixt -D
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vixt from 'vixt/vue'

export default defineConfig({
  plugins: [
    vixt(),
  ],
})
```
