import { IErrorsService } from "./definitions";

export class StaticErrorsService implements IErrorsService {
  public constructor() {}

  public logError(err: Error): void {
    // ...
  }
}
