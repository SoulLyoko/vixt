# vixt build

构建用于生产环境的 Vixt 应用。

## 使用

```sh
vixt build [root]
```

## 参数

| 参数                                         | 说明                       | 默认值  |
| -------------------------------------------- | -------------------------- | ------- |
| `-d, --debug`                                | 显示调试日志               | `false` |
| `-m, --mode=<mode>`                          | 设置环境模式               | -       |
| `-l, --logLevel=<info\|warn\|error\|silent>` | 设置日志级别               | -       |
| `--clear`                                    | 清空控制台                 | `false` |
| `--force`                                    | 忽略缓存并强制重新优化依赖 | `false` |
| `--legacy`                                   | 启用旧版浏览器兼容插件     | `false` |
| `--analyze`                                  | 启用构建产物分析插件       | `false` |
