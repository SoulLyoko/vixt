# Vite 8 Integration

The built-in Vixt modules and plugins now fully support `Vite 8 (rolldown)`!

If you pinned `vite` to an older version, please refer to [Migration from v7 | Vite 8](https://vite.dev/guide/migration) to upgrade `vite` to `8.x`.

## Try it out

Run the `vue` or `react` demo projects in this repository:

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

Because uni-app does not yet have released Vite 8 support, the related demo projects currently only support Vite 7 at most. Stay tuned!

:::

## Configuration loading errors

:::tip

If you are using `vite>=8.0.0-beta.8(rolldown>=1.0.0-beta.60)`, rolldown enables tsconfig auto-discovery by default, which may cause configuration loading errors when `.vixt/tsconfig.json` has not been generated. You can resolve this by:

1. Setting Vite to load configuration natively: `"dev": "vite --configLoader native"`
2. Adding a script: `"postinstall": "vixt prepare"`
3. Upgrading Vite, since later versions no longer enable tsconfig auto-discovery by default.

:::
