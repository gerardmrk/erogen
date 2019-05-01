# Client Web Application

WIP

## Requirements

Node.js v11 or later is required for the builtin Brotli module.

## Instructions

### Quick Start

```sh
$ yarn install # install node modules
$ yarn start # start dev server for the client
$ yarn test # run unit tests
$ yarn build # build all source
```

### Local Development

```sh
$ yarn start
```

Open `http://localhost:4200` in your browser. The dev server is configured to hot-reload on changes.

### Test

```sh
$ yarn test
```

### Build

```sh
$ yarn build # or `gulp`, if it's been globally installed.
```

#### Individual builds

```sh
$ gulp buildClient # build client source
$ gulp buildRenderer # build renderer source
$ gulp buildServer # build server source
```

The **server** source has a build dependency on the **renderer** source, while the **renderer** source has a build dependency on the **client** source. The **client** source is fully independent. The dependency graph looks like this:

```
server > renderer > client
```

## Troubleshooting

If you switch Node.js versions regularly with a version manager like NVM, you may have to re-install fibers each time as it depends `node-gyp` which will be different for each major versions:

```sh
$ yarn remove fibers && yarn add --dev fibers
```

See [here](https://github.com/laverdet/node-fibers#supported-platforms) for more troubleshooting info regarding fibers.
