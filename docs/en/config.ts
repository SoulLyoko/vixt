import { defineAdditionalConfig } from 'vitepress'

import { typeDocDir } from '../typedoc.config'

export default defineAdditionalConfig({
  description: 'Bring the features of Nuxt to modern popular frameworks, like Vue, React, Uni-app, Vitepress, etc.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API', link: `/${typeDocDir}/core/` },
      { text: 'Release', link: 'https://github.com/SoulLyoko/vixt/releases' },
    ],
    sidebar: {
      '/guide': [
        {
          text: 'Get Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Vite8', link: '/guide/vite8' },
          ],
        },
        {
          text: 'Core',
          items: [
            { text: 'Application', link: '/guide/core/app' },
            { text: 'Auto-imports', link: '/guide/core/imports' },
            { text: 'Styles', link: '/guide/core/styles' },
            { text: 'Plugins', link: '/guide/core/plugins' },
            { text: 'Modules', link: '/guide/core/modules' },
            { text: 'Layers', link: '/guide/core/layers' },
            { text: 'Server', link: '/guide/core/server' },
          ],
        },
        {
          text: 'React',
          items: [
            { text: 'App.tsx', link: '/guide/react/app' },
            { text: 'Router', link: '/guide/react/router' },
            { text: 'Layouts', link: '/guide/react/layouts' },
            { text: 'Components', link: '/guide/react/components' },
          ],
        },
        {
          text: 'Uni-app',
          items: [
            { text: 'App.vue', link: '/guide/uni/app' },
            { text: 'Router', link: '/guide/uni/router' },
            { text: 'Layouts', link: '/guide/uni/layouts' },
            { text: 'Components', link: '/guide/uni/components' },
          ],
        },
        {
          text: 'Vitepress',
          items: [
            { text: 'Router', link: '/guide/vitepress/router' },
            { text: 'Layouts', link: '/guide/vitepress/layouts' },
            { text: 'Components', link: '/guide/vitepress/components' },
          ],
        },
        {
          text: 'Vue',
          items: [
            { text: 'App.vue', link: '/guide/vue/app' },
            { text: 'Router', link: '/guide/vue/router' },
            { text: 'Layouts', link: '/guide/vue/layouts' },
            { text: 'Components', link: '/guide/vue/components' },
          ],
        },
      ],
    },
  },
})
