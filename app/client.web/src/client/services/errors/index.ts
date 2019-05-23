import { IErrorsService, ErrorMetaInfo } from "./definitions";
import { State } from "@client/store";

export * from "./definitions";

export class ErrorsService implements IErrorsService {
  public constructor() {}

  public logError(err: Error, meta?: ErrorMetaInfo): void {
    console.error(err);
  }

  public logViewError(err: Error, meta?: ErrorMetaInfo): void {
    console.error(err);
  }

  public logStoreError(err: Error, state: State, meta?: ErrorMetaInfo): void {
    console.error(err);
  }
}
