# vixt preview

在本地启动服务器，预览生产环境构建产物。运行该命令前需要先执行 `vixt build`。

## 使用

```sh
vixt preview [root]
```

## 参数

| 参数                                         | 说明                       | 默认值  |
| -------------------------------------------- | -------------------------- | ------- |
| `-d, --debug`                                | 显示调试日志               | `false` |
| `-m, --mode=<mode>`                          | 设置环境模式               | -       |
| `-l, --logLevel=<info\|warn\|error\|silent>` | 设置日志级别               | -       |
| `--clear`                                    | 清空控制台                 | `false` |
| `--force`                                    | 忽略缓存并强制重新优化依赖 | `false` |
| `--host=<host>`                              | 指定服务器监听地址         | -       |
| `-p, --port=<port>`                          | 指定服务器监听端口         | -       |
| `-o, --open`                                 | 在浏览器中打开应用         | `false` |
| `--cors`                                     | 配置预览服务器的 CORS      | `false` |
| `--strictPort`                               | 指定端口被占用时直接退出   | `false` |
