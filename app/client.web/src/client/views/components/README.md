# Components

Reusable UI components.

Can be either a pure component or a component hooked up to the application store state.

## Custom Components

Basically any directory not prefixed with `ui.`.

## Semantic UI Components

`ui.(...)` directories houses re-exported [**Semantic UI React**](https://react.semantic-ui.com/) components alongside their respective **Less** styles, e.g:

```js
// @client/views/components/ui.elements/Button

import "semantic-ui-less/definitions/elements/button.less";
import { Button } from "semantic-ui-react";
export default Button;
```

This is so we can utilise **Webpack**'s tree-shaking feature for the library's styles; rather than importing the whole library's stylesheet (250kb) at the entrypoint, only styles for individual components are bundled when importing from the re-exported files.

***NOTE:** do not use the sub-component APIs where the components themselves are top-level components. e.g. `Form.Input`, `Form.Checkbox`, `Dropdown.Divider` etc, since it means the bundler has no knowledge of their re-exported styles and your UI/layout will break.*

*On top of that, the docs have stated buggy state support when using various sub-component APIs. Just avoid them like the plague and put in the additional minute hard work into manually importing them from the re-exported entrypoints.*
