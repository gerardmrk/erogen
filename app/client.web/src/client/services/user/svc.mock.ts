import { IUserService } from "./definitions";
import {
  ReturnsMap,
  ThrowsMap,
  RecordedMap,
  IMock,
  RecordableName,
} from "@client/__fixtures__/mock";
import { recordMock } from "@client/__fixtures__/mock-recorder";

@recordMock()
export class MockUserService implements IUserService, IMock<IUserService> {
  public constructor() {}

  /*****************************************************************************
   * Recorder methods
   ****************************************************************************/

  public returns: ReturnsMap<IUserService, RecordableName<IUserService>> = new Map(); // prettier-ignore
  public throws: ThrowsMap<IUserService, RecordableName<IUserService>> = new Map(); // prettier-ignore
  public records: RecordedMap<IUserService, RecordableName<IUserService>> = new Map(); // prettier-ignore

  public resetAll() {
    this.returns.clear();
    this.throws.clear();
    this.records.clear();
  }

  public resetFor(n: RecordableName<IUserService>) {
    this.returns.delete(n);
    this.throws.delete(n);
    this.records.delete(n);
  }

  public throwFor(n: RecordableName<IUserService>, err: Error) {
    this.throws.set(n, err);
  }

  public returnFor(n: RecordableName<IUserService>, ret: any) {
    this.returns.set(n, ret);
  }

  public recorded(n: RecordableName<IUserService>) {
    return this.records.get(n) || { count: 0, args: [], rets: [] };
  }

  /*****************************************************************************
   * Actual methods
   ****************************************************************************/

  public get() {
    throw new Error("Method not implemented.");
  }

  public getProfile() {
    throw new Error("Method not implemented.");
  }

  public updateProfile() {
    throw new Error("Method not implemented.");
  }

  public getAccount() {
    throw new Error("Method not implemented.");
  }

  public updateAccount() {
    throw new Error("Method not implemented.");
  }

  public getBilling() {
    throw new Error("Method not implemented.");
  }

  public updateBilling() {
    throw new Error("Method not implemented.");
  }
}
