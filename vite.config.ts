import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    semi: false,
    singleQuote: true,
    sortImports: true,
    sortTailwindcss: true,
  },
  lint: {
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
    categories: {
      correctness: 'warn',
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  run: {
    cache: {
      scripts: true,
    },
  },
  staged: {
    '*': 'vp check',
  },
  test: {
    globals: true,
    include: ['packages/**/*.{test,spec}.[tj]s'],
  },
})
