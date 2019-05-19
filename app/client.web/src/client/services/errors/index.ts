import { IErrorsService } from "./definitions";

export * from "./definitions";

export class ErrorsService implements IErrorsService {
  public constructor() {}

  public logError(err: Error): void {
    // ...
  }
}
