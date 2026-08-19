import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: 'src/*',
    deps: {
      neverBundle: [/^@vixt\//],
    },
  },
})
