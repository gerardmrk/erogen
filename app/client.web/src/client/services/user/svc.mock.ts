import { IUserService } from "./definitions";
import { IMockService } from "../definitions";

export class MockUserService implements IUserService, IMockService {
  public constructor() {}

  public resetMocks() {}

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
