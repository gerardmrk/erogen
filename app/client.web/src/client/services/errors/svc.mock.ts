import { IErrorsService } from "./definitions";
import { IMockService } from "../definitions";

export class MockErrorsService implements IErrorsService, IMockService {
  public constructor() {}

  public resetMocks() {}

  public logError(err: Error): void {
    // ...
  }
}
