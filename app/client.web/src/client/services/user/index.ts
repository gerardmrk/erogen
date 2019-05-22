import { IUserService } from "./definitions";

export * from "./definitions";

export class UserService implements IUserService {
  public constructor() {}

  public async get() {
    return {
      profile: { username: "", displayPicUrl: "" },
      account: { email: "" },
      billing: {},
    };
  }

  public async getProfile() {
    return { username: "", displayPicUrl: "" };
  }

  public async updateProfile() {
    return { username: "", displayPicUrl: "" };
  }

  public async getAccount() {
    return { email: "" };
  }

  public async updateAccount() {
    return { email: "" };
  }

  public async getBilling() {
    return {};
  }

  public async updateBilling() {
    return {};
  }
}
