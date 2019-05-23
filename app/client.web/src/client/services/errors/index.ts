import { IErrorsService, ErrorMetaInfo } from "./definitions";
import { State } from "@client/store";

export * from "./definitions";

export class ErrorsService implements IErrorsService {
  public constructor() {}

  public async logError(err: Error, meta?: ErrorMetaInfo): Promise<void> {
    console.error(err);
  }

  public async logViewError(err: Error, meta?: ErrorMetaInfo): Promise<void> {
    console.error(err);
  }

  public async logStoreError(
    err: Error,
    state: State,
    meta?: ErrorMetaInfo,
  ): Promise<void> {
    console.error(err);
  }
}
