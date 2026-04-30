import { defineConfig } from 'vitepress'
import vixt from 'vixt/vitepress'

import { typeDocDir } from '../typedoc.config'

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  base: '/vixt/',
  title: 'Vixt',
  description: 'Bring the features of Nuxt to modern popular frameworks, like Vue, React, Uni-app, Vitepress, etc.',
  ignoreDeadLinks: true,
  themeConfig: {
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SoulLyoko/vixt' },
    ],
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: `/${typeDocDir}/core/` },
      { text: 'Releases', link: 'https://github.com/SoulLyoko/vixt/releases' },
    ],
    sidebar: {
      '/guide': [
        {
          text: '介绍',
          items: [
            { text: '开始', link: '/guide/' },
            { text: 'Vite8', link: '/guide/vite8' },
          ],
        },
        {
          text: 'Core',
          items: [
            { text: '应用', link: '/guide/core/app' },
            { text: '自动导入', link: '/guide/core/imports' },
            { text: '样式', link: '/guide/core/styles' },
            { text: '插件', link: '/guide/core/plugins' },
            { text: '模块', link: '/guide/core/modules' },
            { text: '层', link: '/guide/core/layers' },
            { text: '服务端', link: '/guide/core/server' },
          ],
        },
        {
          text: 'React',
          items: [
            { text: 'App.tsx', link: '/guide/react/app' },
            { text: '路由', link: '/guide/react/router' },
            { text: '布局', link: '/guide/react/layouts' },
            { text: '组件', link: '/guide/react/components' },
          ],
        },
        {
          text: 'Uni-app',
          items: [
            { text: 'App.vue', link: '/guide/uni/app' },
            { text: '路由', link: '/guide/uni/router' },
            { text: '布局', link: '/guide/uni/layouts' },
            { text: '组件', link: '/guide/uni/components' },
          ],
        },
        {
          text: 'Vitepress',
          items: [
            { text: '路由', link: '/guide/vitepress/router' },
            { text: '布局', link: '/guide/vitepress/layouts' },
            { text: '组件', link: '/guide/vitepress/components' },
          ],
        },
        {
          text: 'Vue',
          items: [
            { text: 'App.vue', link: '/guide/vue/app' },
            { text: '路由', link: '/guide/vue/router' },
            { text: '布局', link: '/guide/vue/layouts' },
            { text: '组件', link: '/guide/vue/components' },
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
