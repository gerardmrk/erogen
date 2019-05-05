# Application Routes

## Rules

Rules stated here are not for semantical or aesthetical reasons, but due to certain assumptions having to be made on the naming of the routes and the directory structure of the routes' source code.

- Component name must always match the name of its containing directory.
- Do not nest directories for children routes.

## Explanations

Currently, i18n namespaces are assumed to match each route's component name. So are generated chunk names.

## References

- [**SSR with React Router's StaticRouter.**](https://reacttraining.com/react-router/web/guides/server-rendering)
