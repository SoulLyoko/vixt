# vixt build

Build a Vixt application for production.

## Usage

```sh
vixt build [root]
```

## Options

| Option                                       | Description                                       | Default |
| -------------------------------------------- | ------------------------------------------------- | ------- |
| `-d, --debug`                                | Show debug logs                                   | `false` |
| `-m, --mode=<mode>`                          | Set the environment mode                          | -       |
| `-l, --logLevel=<info\|warn\|error\|silent>` | Set the log level                                 | -       |
| `--clear`                                    | Clear the console                                 | `false` |
| `--force`                                    | Ignore the cache and force dependency re-bundling | `false` |
| `--legacy`                                   | Enable the legacy browser compatibility plugin    | `false` |
| `--analyze`                                  | Enable the bundle analyzer plugin                 | `false` |
