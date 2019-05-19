import { IErrorsService } from "./definitions";

export class MockErrorsService implements IErrorsService {
  public constructor() {}

  public logError(err: Error): void {
    // ...
  }
}
