import { createAction } from "typesafe-actions";

export const show = createAction("uiLoader.show", resolve => (message?: TKey) =>
  resolve({ message }),
);

export const hide = createAction("uiLoader.hide");
