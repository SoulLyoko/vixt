import { defineConfig } from 'vitepress'

import importVixt from '../../vixt'

// eslint-disable-next-line antfu/no-top-level-await
const vixt = await importVixt('vixt/vitepress')

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  base: '/vixt/',
  title: 'Vixt',
  description: 'Trying to implement nuxt\'s features via vite plugin',
  ignoreDeadLinks: true,
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SoulLyoko/vixt' },
    ],
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/config/core' },
      { text: 'API', link: '/api/vixt' },
    ],
    sidebar: {
      '/guide': [
        {
          text: '介绍',
          items: [
            { text: '开始', link: '/guide/' },
            { text: '更新日志', link: '/guide/changelog' },
          ],
        },
        {
          text: '功能',
          items: [
            { text: '应用', link: '/guide/app' },
            { text: '路由', link: '/guide/router' },
            { text: '布局', link: '/guide/layouts' },
            { text: '组件', link: '/guide/components' },
            { text: '自动导入', link: '/guide/imports' },
            { text: '样式', link: '/guide/styles' },
            { text: '插件', link: '/guide/plugins' },
            { text: '模块', link: '/guide/modules' },
            { text: '层', link: '/guide/layers' },
            { text: 'Rolldown', link: '/guide/rolldown' },
          ],
        },
      ],
      '/config': [
        { text: 'core', link: '/config/core' },
        { text: 'vue', link: '/config/vue' },
        { text: 'uni', link: '/config/uni' },
        { text: 'vitepress', link: '/config/vitepress' },
        { text: 'react', link: '/config/react' },
      ],
      '/api': [
        { text: 'vixt', link: '/api/vixt' },
        { text: 'client', link: '/api/client' },
      ],
    },
  },
  vite: {
    plugins: [vixt()],
  },
})
