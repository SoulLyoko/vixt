import { defineConfig } from 'vitepress'

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  base: '/vixt',
  title: 'Vixt',
  description: 'Trying to implement nuxt\'s features via vite plugin',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/start' },
    ],
    sidebar: {
      '/guide': [
        { text: '开始', link: '/guide/start' },
        { text: '更新日志', link: '/guide/changelog' },
      ],
    },
  },
})
