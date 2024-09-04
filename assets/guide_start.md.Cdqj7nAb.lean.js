import{_ as i,c as a,a0 as t,o as e}from"./chunks/framework.CeO6fEXZ.js";const c=JSON.parse('{"title":"Vixt","description":"","frontmatter":{},"headers":[],"relativePath":"guide/start.md","filePath":"guide/start.md"}'),n={name:"guide/start.md"};function l(h,s,p,r,k,d){return e(),a("div",null,s[0]||(s[0]=[t(`<h1 id="vixt" tabindex="-1">Vixt <a class="header-anchor" href="#vixt" aria-label="Permalink to &quot;Vixt&quot;">​</a></h1><p><a href="https://soullyoko.github.io/vixt/" target="_blank" rel="noreferrer">文档</a></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>Vixt是一个<a href="https://vitepress.dev/zh/" target="_blank" rel="noreferrer">Vite</a>插件，与<a href="https://nuxt.com.cn/" target="_blank" rel="noreferrer">Nuxt</a>一样以开发者体验为核心，名字取自Vite的前两个字母和Nuxt的后两个字母。</p><h2 id="为什么不用nuxt" tabindex="-1">为什么不用Nuxt? <a class="header-anchor" href="#为什么不用nuxt" aria-label="Permalink to &quot;为什么不用Nuxt?&quot;">​</a></h2><p>Nuxt具备SSR和全栈开发的能力，如果你的项目需要这些，Nuxt是个不错的选择。当然它也可以通过配置关闭ssr甚至是混合渲染以适应不同的场景，但是它依然会带来一些额外的性能开销和心智负担，随着项目体积增大，启动时间也会成倍增加（这也是Vixt诞生的主要原因）。</p><p>而Vixt则是一个轻量级的Vite插件，抛弃了ssr(也许后续会支持)和服务端，它的启动速度完全取决于Vite，Vite有多快，Vixt就有多快，同时它也提供了一些提升开发者体验的特性，比如文件系统路由、布局、自动导入、模块(modules)、图层(layers)等。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><h3 id="前置准备" tabindex="-1">前置准备 <a class="header-anchor" href="#前置准备" aria-label="Permalink to &quot;前置准备&quot;">​</a></h3><ul><li>Node.js - v18.0.0 或更新版本</li><li>文本编辑器 - 推荐使用 VSCode 以及 Volar 扩展</li><li>终端 - 用于运行命令</li></ul><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vixt</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// vite.config.ts</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vite&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> vixt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vixt/vue&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // vue项目</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// import vixt from &#39;vixt/uni&#39; // uni-app项目</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vixt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div>`,12)]))}const u=i(n,[["render",l]]);export{c as __pageData,u as default};
