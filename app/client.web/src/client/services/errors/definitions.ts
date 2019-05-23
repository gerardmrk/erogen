import { State } from "@client/store";

export type ErrorMetaInfo = {
  userId?: string;
  unhandled?: boolean;
};

export interface IErrorsService {
  logError(err: Error, meta?: ErrorMetaInfo): Promise<void>;

  logViewError(err: Error, meta?: ErrorMetaInfo): Promise<void>;

  logStoreError(err: Error, state: State, meta?: ErrorMetaInfo): Promise<void>;
}
