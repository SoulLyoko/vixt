import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: ['**/pages.json'],
  },
  {
    rules: {
      'no-console': 'off', // 允许console
      'ts/prefer-ts-expect-error': 'off', // 允许忽略类型检查
      'ts/ban-ts-comment': 'off', // 允许忽略类型检查
      'eslint-comments/no-unlimited-disable': 'off', // 允许忽略规则
      'unused-imports/no-unused-imports': 'error', // 不允许未使用的导入
      'import/order': [ // 导入排序
        'error',
        {
          'groups': ['type', 'builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.md/*'],
    rules: {
      'unused-imports/no-unused-imports': 'off', // md文件允许未使用的导入
    },
  },
)
