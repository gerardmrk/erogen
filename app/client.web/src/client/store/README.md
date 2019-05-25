# Application Store

## Actions

Create Redux actions with [**typesafe-actions**](https://github.com/piotrwitek/typesafe-actions).


## Store Middleware

### `store/middleware/example-middleware.ts`
```ts
import { Middleware } from ".";

export const exampleMiddleware = (): Middleware => api => next => async action => {
  // dispatch the action as usual, unless
  // this middleware is meant to intercept actions.
  next(action);

  if (action.hasSpecificSignature) {
    // do stuff...
  }
}
```

### `store/middleware/index.ts`
```ts
...

// add after `asyncActionMiddleware`
// and before `errorHandlerMiddleware`

const middleware = applyMiddleware(
  asyncActionMiddleware.withExtraArgument(services),
  exampleMiddleware(), // <-- your middleware.
  postLoginMiddleware(services.user),
  uiMessageTriggerMiddleware(),
  uiLoaderTriggerMiddleware(),
  errorHandlerMiddleware(services.errors),
);

...
```

### Store State & Actions

### `store/state.example/actions.ts`
```ts
import { createAction } from "typesafe-actions";

export const actionA = createAction("ex.actionA", resolve => (payload) => {
  return resolve(payload);
});

export const actionB = createAction("ex.actionB", resolve => (payload) => {
  return resolve(payload);
});

export const actionCPending = createAction("ex.actionCPending", resolve => meta => {
  return resolve(undefined, meta);
});

export const actionCSuccess = createAction("ex.actionCSuccess", resolve => (payload, meta) => {
  return resolve(payload, meta);
});

export const actionCFailure = createAction("ex.actionCFailure", resolve => (payload, meta) => {
  return resolve(payload, meta);
});
```

### `store/state.example/async.action-c.ts`
```ts
import { AsyncAction } from "@client/store";
import * as actions from "./actions";

export const actionC = (
  arg1: string,
  arg2: boolean
): AsyncAction => async (
  dispatch,
  getState,
  services,
) => {
  try {
    dispatch(actions.actionCPending({ loader: true }));

    const resp = await services.example.doSomething(arg1, arg2);

    dispatch(actions.actionCSuccess(resp, { loader: false }));
  } catch (err) {
    dispatch(actions.actionCFailure(err, { loader: false }));
  }
}
```

### `store/state.example/index.ts`
```ts
import { ActionType } from "typesafe-actions";
import { DeepReadonly } from "utility-types";
import { createReducer } from "@client/store/create-reducer";
import * as actions from "./actions";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<
  {
    stateKey1: string | undefined;
    stateKey2: string[] | undefined;
  } & AsyncState<Action>
>;

export const defaultState = (): State => ({
  isLoading: false,
  error: undefined,
  stateKey1: undefined,
  stateKey2: undefined,
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["ex.actionA"]: (state, action) => ({
    ...state
  }),

  ["ex.actionB"]: (state, action) => ({
    ...state
  }),

  ["ex.actionCPending"]: (state, action) => ({
    ...state,
    isLoading: true,
  }),

  ["ex.actionCSuccess"]: (state, action) => ({
    ...state,
    isLoading: false,
  }),

  ["ex.actionCFailure"]: (state, action) => ({
    ...state,
    isLoading: false,
  }),
});

```

### `store/index.ts`

```ts
...

import * as example from "./state.example";

...

export type Action =
  | auth.Action
  | user.Action
  | uiLoader.Action
  | uiMessage.Action
  | example.Action;  // <-- add to the root Action type

...

export type State = {
  auth: auth.State;
  user: user.State;
  i18n: i18n.State;
  uiLoader: uiLoader.State;
  uiMessage: uiMessage.State;
  example: example.State; // <-- add to the root State type
};

...

const reducer: Reducer<State, Action> = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  i18n: i18n.reducer,
  uiLoader: uiLoader.reducer,
  uiMessage: uiMessage.reducer,
  example: example.reducer, // <-- add to the root reducer map
});
```
