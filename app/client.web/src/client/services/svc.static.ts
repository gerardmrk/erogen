import { IServices } from "./definitions";
import { StaticAuthService } from "./auth/svc.static";
import { StaticUserService } from "./user/svc.static";
import { StaticErrorsService } from "./errors/svc.static";

export class StaticServices implements IServices {
  public auth: StaticAuthService;
  public user: StaticUserService;
  public errors: StaticErrorsService;

  public constructor() {
    this.auth = new StaticAuthService();
    this.user = new StaticUserService();
    this.errors = new StaticErrorsService();
  }
}
