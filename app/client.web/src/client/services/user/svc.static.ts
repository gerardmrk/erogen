import faker from "faker";
import { IUserService } from "./definitions";
import { sleep } from "@client/utils/sleep";

export class StaticUserService implements IUserService {
  public constructor() {}

  public async get() {
    await sleep(5000);
    return {
      profile: {
        username: faker.internet.userName(),
        displayPicUrl: faker.image.avatar(),
      },
      account: {
        id: faker.random.uuid(),
        email: faker.internet.email(),
      },
      billing: {},
    };
  }

  public async getProfile() {
    return {
      username: faker.internet.userName(),
      displayPicUrl: faker.image.avatar(),
    };
  }

  public async updateProfile() {
    return {
      username: faker.internet.userName(),
      displayPicUrl: faker.image.avatar(),
    };
  }

  public async getAccount() {
    return {
      id: faker.random.uuid(),
      email: faker.internet.email(),
    };
  }

  public async updateAccount() {
    return {
      id: faker.random.uuid(),
      email: faker.internet.email(),
    };
  }

  public async getBilling() {
    return {};
  }

  public async updateBilling() {
    return {};
  }
}
