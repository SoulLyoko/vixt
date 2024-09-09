import { defineConfig } from 'vitepress'
import vixt from 'vixt/vitepress'

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  base: '/vixt',
  title: 'Vixt',
  description: 'Trying to implement nuxt\'s features via vite plugin',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/start' },
      { text: 'API', link: '/api/vixt' },
    ],
    sidebar: {
      '/guide': [
        { text: '开始', link: '/guide/start' },
        { text: '更新日志', link: '/guide/changelog' },
      ],
      '/api': [
        { text: 'vixt', link: '/api/vixt' },
        { text: 'core', link: '/api/core' },
        {
          text: 'Vixt 配置',
          base: '/api/config',
          items: [
            { text: 'core', link: '/core' },
            { text: 'vue', link: '/vue' },
            { text: 'uni', link: '/uni' },
          ],
        },
      ],
    },
  },
  vite: {
    plugins: [vixt()],
  },
})
