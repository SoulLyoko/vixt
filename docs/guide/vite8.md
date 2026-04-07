# Vite 8 集成

Vixt内置的模块和插件现已完美支持 `Vite 8 (rolldown)`!

如果你将 `vite` 锁定在了旧版本，请参考 [Migration from v7 | Vite 8](https://vite.dev/guide/migration) 将 `vite` 升级到 `8.x`

## 试试看吧

运行本仓库中的 `vue` 或 `react` 示例项目

```sh
# clone repo
git clone https://github.com/SoulLyoko/vixt.git

# install deps
pnpm i

# run and visit http://localhost:5173
pnpm dev:vue
# or
pnpm dev:react
```

## uni-app

:::tip

由于uni-app的Vite 8支持尚未发布，相关示例项目暂时最高只支持vite 7，敬请期待!

:::

## 加载配置文件报错

:::tip

如果你在使用 `vite>=8.0.0-beta.8(rolldown>=1.0.0-beta.60)` ，rolldown默认启用了tsconfig的自动发现，导致在未生成 `.vixt/tsconfig.json` 时加载配置文件报错，可以使用以下方式来解决：

1. 将vite加载配置文件的方式设置为 native `"dev": "vite --configLoader native"`
2. 添加脚本 `"postinstall": "vixt prepare"`
3. 升级 vite, 后续 vite 已默认不启用tsconfig自动发现

:::
