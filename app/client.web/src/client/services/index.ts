import { IServices } from "./interface";
import { IAuthService } from "./auth";
import { IUserService, UserService } from "./user";
import { IErrorReporterService, ErrorReporterService } from "./error-reporter";
export * from "./interface";

export class Services implements IServices {
  public auth: IAuthService;
  public user: IUserService;
  public errorReporter: IErrorReporterService;

  public constructor() {
    this.auth = new AuthService();
    this.user = new UserService();
    this.errorReporter = new ErrorReporterService();
  }
}
