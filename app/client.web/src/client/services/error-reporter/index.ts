import { IErrorReporterService } from "./interface";
export * from "./interface";

export class ErrorReporterService implements IErrorReporterService {
  public constructor() {}

  public logError(): void {
    // ...
  }
}
