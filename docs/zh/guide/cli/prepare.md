# vixt prepare

加载 Vixt 配置并生成开发所需的文件，例如 `.vixt/tsconfig.json`。

## 使用

```sh
vixt prepare [root]
```

通常将该命令配置为 `postinstall` 脚本，以便安装依赖后自动更新生成文件：

```json
{
  "scripts": {
    "postinstall": "vixt prepare"
  }
}
```

## 参数

| 参数                                         | 说明                       | 默认值  |
| -------------------------------------------- | -------------------------- | ------- |
| `-d, --debug`                                | 显示调试日志               | `false` |
| `-m, --mode=<mode>`                          | 设置环境模式               | -       |
| `-l, --logLevel=<info\|warn\|error\|silent>` | 设置日志级别               | -       |
| `--clear`                                    | 清空控制台                 | `false` |
| `--force`                                    | 忽略缓存并强制重新优化依赖 | `false` |
