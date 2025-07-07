---
outline: deep
---

# `vite/vue` 的配置

## app

### head

- 类型：`object`
- 默认值：

```json
{
  "meta": [
    { "charset": "utf-8" },
    { "name": "viewport", "content": "width=device-width, initial-scale=1.0" }
  ]
}
```

示例：

```js
export default {
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        { src: 'https://awesome-lib.js' }
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        { rel: 'stylesheet', href: 'https://awesome-lib.css' }
      ],
      style: [
        // <style type="text/css">:root { color: red }</style>
        { children: ':root { color: red }', type: 'text/css' }
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: 'JavaScript is required' }
      ],
      title: [
        // <title>Website Title</title>
        { children: 'Website Title' }
      ]
    }
  }
}
```

### baseURL

- 类型：`string`
- 默认值：`/`

应用的基础路径

### rootId

- 类型：`string`
- 默认值：`app`

应用的根元素id

### rootTag

- 类型：`string`
- 默认值：`div`

应用的根元素标签

### css

- 类型：`string[]`
- 默认值：无

全局导入的css文件

### loadingTemplate

- 类型：`string`
- 默认值：`'<rootDir>/loading.html'`

应用的加载模板路径，将被插入到 `index.html` 中

## vue

[@vitejs/plugin-vue的配置](https://github.com/vitejs/vite-plugin-vue)

## vueJsx

[@vitejs/plugin-vue-jsx的配置](https://github.com/vitejs/vite-plugin-vue)

## router

[unplugin-vue-router的配置](https://github.com/posva/unplugin-vue-router)

## layouts

[vite-plugin-vue-layouts的配置](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)

## components

[unplugin-vue-components的配置](https://github.com/antfu/unplugin-vue-components)

## imports

[unplugin-auto-import的配置](https://github.com/antfu/unplugin-auto-import)

## unocss

[unocss的配置](https://github.com/antfu/unocss)

## devtools

[vite-plugin-vue-devtools的配置](https://github.com/webfansplz/vite-plugin-vue-devtools)
