import { IUserService } from "./definitions";
import { FunctionKeys } from "utility-types";
import { ReturnsMap, ThrowsMap, RecordedMap } from "@client/__fixtures__/mock";
import { recordMock } from "@client/__fixtures__/mock-recorder";

@recordMock()
export class MockUserService implements IUserService {
  public constructor() {}

  /*****************************************************************************
   * Recorder methods
   ****************************************************************************/

  public returns: ReturnsMap<IUserService, FunctionKeys<IUserService>> = new Map(); // prettier-ignore
  public throws: ThrowsMap<IUserService, FunctionKeys<IUserService>> = new Map(); // prettier-ignore
  public recorded: RecordedMap<IUserService, FunctionKeys<IUserService>> = new Map(); // prettier-ignore

  public resetAll() {
    this.returns.clear();
    this.throws.clear();
    this.recorded.clear();
  }

  public resetFor(n: FunctionKeys<IUserService>) {
    this.returns.delete(n);
    this.throws.delete(n);
    this.recorded.delete(n);
  }

  public throwFor(n: FunctionKeys<IUserService>, err: Error) {
    this.throws.set(n, err);
  }

  public returnFor(n: FunctionKeys<IUserService>, ret: any) {
    this.returns.set(n, ret);
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
