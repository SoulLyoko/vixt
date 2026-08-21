# vixt preview

Start a local server to preview the production build. Run `vixt build` before starting the preview server.

## Usage

```sh
vixt preview [root]
```

## Options

| Option                                       | Description                                       | Default |
| -------------------------------------------- | ------------------------------------------------- | ------- |
| `-d, --debug`                                | Show debug logs                                   | `false` |
| `-m, --mode=<mode>`                          | Set the environment mode                          | -       |
| `-l, --logLevel=<info\|warn\|error\|silent>` | Set the log level                                 | -       |
| `--clear`                                    | Clear the console                                 | `false` |
| `--force`                                    | Ignore the cache and force dependency re-bundling | `false` |
| `--host=<host>`                              | Specify the server host                           | -       |
| `-p, --port=<port>`                          | Specify the server port                           | -       |
| `-o, --open`                                 | Open the application in the browser               | `false` |
| `--cors`                                     | Configure CORS for the preview server             | `false` |
| `--strictPort`                               | Exit if the specified port is already in use      | `false` |
