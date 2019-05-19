import { IUserService } from "./user/interface";
import { IAuthService } from "./auth/definitions";
import { IErrorReporterService } from "./error-reporter/interface";

export interface IServices {
  user: IUserService;
  auth: IAuthService;
  errorReporter: IErrorReporterService;
}
