## [0.0.15](https://github.com/SoulLyoko/vixt/compare/v0.0.14...v0.0.15) (2024-07-07)



## [0.0.14](https://github.com/SoulLyoko/vixt/compare/v0.0.13...v0.0.14) (2024-07-07)


### Bug Fixes

* **core:** tsconfig include layers relatedCwd ([1116ad0](https://github.com/SoulLyoko/vixt/commit/1116ad0ffa24fb71062e0adc01d84078b1026319))
* **vue:** reverse layoutsDirs array, to support overrides layouts ([7554528](https://github.com/SoulLyoko/vixt/commit/7554528771e0bb0658a695d4213d392503b2d208))



## [0.0.13](https://github.com/SoulLyoko/vixt/compare/v0.0.12...v0.0.13) (2024-07-07)


### Bug Fixes

* **uni:** corrected layersPluginsPath ([600c246](https://github.com/SoulLyoko/vixt/commit/600c246ceca380f47e7a7e9ff97f427370da172b))



## [0.0.12](https://github.com/SoulLyoko/vixt/compare/v0.0.11...v0.0.12) (2024-07-06)


### Bug Fixes

* **core:** copy layers exclude node_modules and tsconfig.json ([ebe9a4a](https://github.com/SoulLyoko/vixt/commit/ebe9a4a2e62cbf3d9f0d0b5ab240f0777f1a2f99))


### Features

* **core:** add alias `#` for buildDir ([e21aba5](https://github.com/SoulLyoko/vixt/commit/e21aba5a17a9649efad34ef84303f1d01bb68e5f))



## [0.0.11](https://github.com/SoulLyoko/vixt/compare/v0.0.10...v0.0.11) (2024-07-05)


### Bug Fixes

* copy layers files to .vixt/layers, because vite cannot transform files in node_modules ([1d97a61](https://github.com/SoulLyoko/vixt/commit/1d97a61a3c41c43e20168d14997df691e280840b))



## [0.0.10](https://github.com/SoulLyoko/vixt/compare/v0.0.9...v0.0.10) (2024-07-04)


### Bug Fixes

* components overrides ([9c89ce6](https://github.com/SoulLyoko/vixt/commit/9c89ce676a3bd2f0baeaa2e30094804b87dda774))
* vixt.options.vite ([e407eae](https://github.com/SoulLyoko/vixt/commit/e407eae321e747da36026cb62da8c8969a53acc4))
* **vue:** default disabled devtools ([e0a97d9](https://github.com/SoulLyoko/vixt/commit/e0a97d9b9c0da2abc5a57f3e5e7da200afffe12d))



## [0.0.9](https://github.com/SoulLyoko/vixt/compare/v0.0.8...v0.0.9) (2024-07-03)


### Bug Fixes

* **uni:** vueuse auto import error ([5f080e3](https://github.com/SoulLyoko/vixt/commit/5f080e3cad55b16bd6191598d23085f025a60302))



## [0.0.8](https://github.com/SoulLyoko/vixt/compare/v0.0.7...v0.0.8) (2024-07-03)


### Bug Fixes

* improve typescript dx ([a61c9ba](https://github.com/SoulLyoko/vixt/commit/a61c9ba7882f3107db7e53f3c2f848457b0d5c40))


### Features

* **uni:** auto import uni-use ([7f5b66c](https://github.com/SoulLyoko/vixt/commit/7f5b66cad98e50a832471761ab4d8eb02752ae21))



## [0.0.7](https://github.com/SoulLyoko/vixt/compare/v0.0.6...v0.0.7) (2024-07-02)


### Bug Fixes

* **core:** filter layers required `cwd` ([c64321c](https://github.com/SoulLyoko/vixt/commit/c64321ca6fe14d85c0e347b044b2505505666583))
* **core:** remove devProxy and warmup ([3134199](https://github.com/SoulLyoko/vixt/commit/31341998c6562e243529c46ac399f7a9d747f863))
* set baseURL default value ([4f9845e](https://github.com/SoulLyoko/vixt/commit/4f9845e0baa4116b79008be1c60b387c6490828f))


### Features

* **uni:** patch `normalizeNodeModules` in `@dcloudio/uni-cli-shared/dist/utils.js` ([9f46c4a](https://github.com/SoulLyoko/vixt/commit/9f46c4a51b42dcba8b1a696021839ff915ce374e))



## [0.0.6](https://github.com/SoulLyoko/vixt/compare/v0.0.5...v0.0.6) (2024-07-01)


### Bug Fixes

* enable vite-plugin-checker ([f2eb606](https://github.com/SoulLyoko/vixt/commit/f2eb606f62ed33cfdc0d510f3986b1c8e23c2a7f))


### Features

* add rootDir ([5f95431](https://github.com/SoulLyoko/vixt/commit/5f95431988b4377b21951f74d34babb574586f6e))



## [0.0.5](https://github.com/SoulLyoko/vixt/compare/v0.0.4...v0.0.5) (2024-06-30)


### Bug Fixes

* **core:** disabled vite-plugin-checker until it upgrade ([045c8af](https://github.com/SoulLyoko/vixt/commit/045c8afcf2994d2ff298dcd299acbff6b9c88a2f))



## [0.0.4](https://github.com/SoulLyoko/vixt/compare/v0.0.3...v0.0.4) (2024-06-30)


### Bug Fixes

* **vue:** ignore tscheck in generated main.ts file ([11c6a36](https://github.com/SoulLyoko/vixt/commit/11c6a36b0918fc9234b5ed61ccd499fe43e0803e))



## [0.0.3](https://github.com/SoulLyoko/vixt/compare/v0.0.2...v0.0.3) (2024-06-29)



## [0.0.2](https://github.com/SoulLyoko/vixt/compare/v0.0.1...v0.0.2) (2024-06-29)


### Bug Fixes

* **core:** use tsx/esm to import ts modules ([9ead639](https://github.com/SoulLyoko/vixt/commit/9ead63922a323b028dba9590de75eff0e43b4ba6))



## 0.0.1 (2024-06-29)


### Features

* first commit ([8bf0b87](https://github.com/SoulLyoko/vixt/commit/8bf0b8744b8e942b15d8770db6877319d3a2e151))



