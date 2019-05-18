import { createAction } from "typesafe-actions";
import { MessageLevel } from ".";

export type ShowPayload = {
  level?: MessageLevel;
  header?: TKey;
  content?: TKey;
  list?: TKey[];
  autoDismiss?: false | number;
};

// prettier-ignore
export const show = createAction(
  "uiMessage.show",
  resolve => (payload: ShowPayload) => (resolve({
    level: payload.level || MessageLevel.Info,
    header: payload.header,
    content: payload.content,
    list: payload.list,
    autoDismiss: typeof payload.autoDismiss === "undefined"
      ? 1800
      : payload.autoDismiss
  })),
);

export const hide = createAction("uiMessage.hide");
