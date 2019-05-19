import { ErrorsService } from "./errors";
import { UserService } from "./user";
import { AuthService } from "./auth";
import { IServices } from "./definitions";

export * from "./definitions";

export class Services implements IServices {
  public auth: AuthService;
  public user: UserService;
  public errors: ErrorsService;

  public constructor() {
    this.auth = new AuthService();
    this.user = new UserService();
    this.errors = new ErrorsService();
  }
}
