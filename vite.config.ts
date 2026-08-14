import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    arrowParens: 'avoid',
    semi: false,
    singleQuote: true,
    sortImports: {
      groups: ['type', 'builtin', 'external', 'internal'],
    },
  },
  lint: {
    rules: {
      'no-empty-file': 'off',
      'no-floating-promises': 'off',
      'no-unused-expressions': 'off',
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    '*.{js,ts,vue}': 'vp check --fix',
  },
  test: {
    globals: true,
    exclude: ['**/node_modules/**', '**/.git/**', 'playground/vue/**/*'],
  },
})
