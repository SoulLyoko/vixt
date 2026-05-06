import { defineConfig } from 'vitepress'
import vixt from 'vixt/vitepress'

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  base: '/vixt/',
  title: 'Vixt',
  ignoreDeadLinks: true,
  rewrites: {
    'en/:rest*': ':rest*',
  },
  locales: {
    root: { label: 'English', lang: 'en' },
    zh: { label: '中文', lang: 'zh' },
  },
  themeConfig: {
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SoulLyoko/vixt' },
    ],
    search: {
      provider: 'local',
    },
  },
  vite: {
    plugins: [vixt()],
  },
})
