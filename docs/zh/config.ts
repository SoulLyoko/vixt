import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  description: '将Nuxt的特性带到现代流行的框架中，如Vue、React、Uni-app、Vitepress等。',
  themeConfig: {
    nav: [
      { text: '指南', link: '/zh/guide/introduction' },
      { text: 'API', link: '/api/core/' },
      { text: '更新日志', link: 'https://github.com/SoulLyoko/vixt/releases' },
    ],
    sidebar: {
      '/zh/guide': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/zh/guide/introduction' },
            { text: '安装', link: '/zh/guide/installation' },
            { text: 'Vite8', link: '/zh/guide/vite8' },
          ],
        },
        {
          text: 'Core',
          items: [
            { text: '应用', link: '/zh/guide/core/app' },
            { text: '自动导入', link: '/zh/guide/core/imports' },
            { text: '样式', link: '/zh/guide/core/styles' },
            { text: '插件', link: '/zh/guide/core/plugins' },
            { text: '模块', link: '/zh/guide/core/modules' },
            { text: '层', link: '/zh/guide/core/layers' },
            { text: '服务端', link: '/zh/guide/core/server' },
          ],
        },
        {
          text: 'React',
          items: [
            { text: 'App.tsx', link: '/zh/guide/react/app' },
            { text: '路由', link: '/zh/guide/react/router' },
            { text: '布局', link: '/zh/guide/react/layouts' },
            { text: '组件', link: '/zh/guide/react/components' },
          ],
        },
        {
          text: 'Uni-app',
          items: [
            { text: 'App.vue', link: '/zh/guide/uni/app' },
            { text: '路由', link: '/zh/guide/uni/router' },
            { text: '布局', link: '/zh/guide/uni/layouts' },
            { text: '组件', link: '/zh/guide/uni/components' },
          ],
        },
        {
          text: 'Vitepress',
          items: [
            { text: '路由', link: '/zh/guide/vitepress/router' },
            { text: '布局', link: '/zh/guide/vitepress/layouts' },
            { text: '组件', link: '/zh/guide/vitepress/components' },
          ],
        },
        {
          text: 'Vue',
          items: [
            { text: 'App.vue', link: '/zh/guide/vue/app' },
            { text: '路由', link: '/zh/guide/vue/router' },
            { text: '布局', link: '/zh/guide/vue/layouts' },
            { text: '组件', link: '/zh/guide/vue/components' },
          ],
        },
      ],
    },
  },
})
