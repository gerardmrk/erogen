import { IUserService } from "./definitions";

export * from "./definitions";

export class UserService implements IUserService {
  public constructor() {}

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
