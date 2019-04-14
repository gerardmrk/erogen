import { createAction } from "typesafe-actions";
import { MessageType } from ".";

export const show = createAction(
  "globalUIMessage.show",
  resolve => (message: TranslationKey, messageType: MessageType) =>
    resolve({ message, messageType }),
);

export const hide = createAction("globalUIMessage.hide");
