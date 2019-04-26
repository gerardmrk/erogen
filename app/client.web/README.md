# Client Web Application

## Requirements

Node.js v11 or later is required; the Webpack build utilises the builtin Brotli module which was only introduced in v11.

If switching Node.js versions with NVM, you may have to uninstall and re-install fibers:

```sh
$ npm uninstall --save fibers
$ npm install --save fibers
```

## Instructions

```sh
$ npm install
$ npm start
```

Open `http://localhost:4200` in your browser.

### Build

The **server** source has a build dependency on the **renderer** source, while the **renderer** source has a build dependency on the **client** source. The **client** source is fully independent. The dependency graph looks like this:

```
server > renderer > client
```

The client build produces `dist/client/async-modules.json` which is needed by the renderer source. The compiled renderer source is needed by the server source so the server does not need module-loaders to register non-JS module imports. With that said, run in the following order (will delegate all these to Bazel in the very near future):

```sh
$ npm run build
$ npm run rdr:build
$ npm run srv:build # WIP; INCOMPLETE
```
