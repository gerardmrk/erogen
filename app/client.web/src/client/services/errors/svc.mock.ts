import { IErrorsService, ErrorMetaInfo } from "./definitions";
import {
  IMock,
  ReturnsMap,
  ThrowsMap,
  RecordedMap,
  RecordableName,
} from "@client/__fixtures__/mock";
import { recordMock } from "@client/__fixtures__/mock-recorder";
import { State } from "@client/store";

// prettier-ignore
@recordMock()
export class MockErrorsService implements IErrorsService, IMock<MockErrorsService> {
  public constructor() {}

  /*****************************************************************************
   * Recorder methods
   ****************************************************************************/

  public returns: ReturnsMap<IErrorsService, RecordableName<IErrorsService>> = new Map(); // prettier-ignore
  public throws: ThrowsMap<IErrorsService, RecordableName<IErrorsService>> = new Map(); // prettier-ignore
  public records: RecordedMap<IErrorsService, RecordableName<IErrorsService>> = new Map(); // prettier-ignore

  public resetAll() {
    this.returns.clear();
    this.throws.clear();
    this.records.clear();
  }

  public resetFor(n: RecordableName<IErrorsService>) {
    this.returns.delete(n);
    this.throws.delete(n);
    this.records.delete(n);
  }

  public throwFor(n: RecordableName<IErrorsService>, err: Error) {
    this.throws.set(n, err);
  }

  public returnFor(n: RecordableName<IErrorsService>, ret: any) {
    this.returns.set(n, ret);
  }

  public recorded(n: RecordableName<IErrorsService>) {
    return this.records.get(n) || { count: 0, args: [], rets: [] };
  }

  /*****************************************************************************
   * Actual methods
   ****************************************************************************/

  public logViewError(err: Error, meta?: ErrorMetaInfo): void {
    return;
  }

  public logStoreError(err: Error, state: State, meta?: ErrorMetaInfo): void {
    return;
  }
}
