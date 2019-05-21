import { IErrorsService } from "./definitions";
import {
  IMock,
  ReturnsMap,
  ThrowsMap,
  RecordedMap,
} from "@client/__fixtures__/mock";
import { FunctionKeys } from "utility-types";
import { recordMock } from "@client/__fixtures__/mock-recorder";

// prettier-ignore
@recordMock()
export class MockErrorsService implements IErrorsService, IMock<MockErrorsService> {
  public constructor() {}

  /*****************************************************************************
   * Recorder methods
   ****************************************************************************/

  public returns: ReturnsMap<IErrorsService, FunctionKeys<IErrorsService>> = new Map(); // prettier-ignore
  public throws: ThrowsMap<IErrorsService, FunctionKeys<IErrorsService>> = new Map(); // prettier-ignore
  public recorded: RecordedMap<IErrorsService, FunctionKeys<IErrorsService>> = new Map(); // prettier-ignore

  public resetAll() {
    this.returns.clear();
    this.throws.clear();
    this.recorded.clear();
  }

  public resetFor(n: FunctionKeys<IErrorsService>) {
    this.returns.delete(n);
    this.throws.delete(n);
    this.recorded.delete(n);
  }

  public throwFor(n: FunctionKeys<IErrorsService>, err: Error) {
    this.throws.set(n, err);
  }

  public returnFor(n: FunctionKeys<IErrorsService>, ret: any) {
    this.returns.set(n, ret);
  }

  /*****************************************************************************
   * Actual methods
   ****************************************************************************/

  public logError(err: Error): void {
    // ...
  }
}
