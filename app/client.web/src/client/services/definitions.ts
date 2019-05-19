import { IUserService } from "./user";
import { IAuthService } from "./auth";
import { IErrorsService } from "./errors";

export interface IMockService {
  resetMocks(): void;
}

export interface IServices {
  user: IUserService;
  auth: IAuthService;
  errors: IErrorsService;
}
