# vixt prepare

Load the Vixt configuration and generate development files such as `.vixt/tsconfig.json`.

## Usage

```sh
vixt prepare [root]
```

This command is usually configured as a `postinstall` script so generated files are updated after dependencies are installed:

```json
{
  "scripts": {
    "postinstall": "vixt prepare"
  }
}
```

## Options

| Option                                       | Description                                       | Default |
| -------------------------------------------- | ------------------------------------------------- | ------- |
| `-d, --debug`                                | Show debug logs                                   | `false` |
| `-m, --mode=<mode>`                          | Set the environment mode                          | -       |
| `-l, --logLevel=<info\|warn\|error\|silent>` | Set the log level                                 | -       |
| `--clear`                                    | Clear the console                                 | `false` |
| `--force`                                    | Ignore the cache and force dependency re-bundling | `false` |
