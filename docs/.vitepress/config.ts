import { defineConfig } from 'vitepress'

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  title: 'Vixt',
  description: 'Trying to implement nuxt\'s features via vite plugin',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/start' },
    ],
    sidebar: {
      '/guide': [
        { text: 'Getting Started', link: '/guide/start' },
        { text: 'Changelog', link: '/guide/changelog' },
      ],
    },
  },
})
