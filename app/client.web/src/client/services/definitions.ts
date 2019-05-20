import { IUserService } from "./user";
import { IAuthService } from "./auth";
import { IErrorsService } from "./errors";

export interface IServices {
  user: IUserService;
  auth: IAuthService;
  errors: IErrorsService;
}

export interface IMockService<S> {
  returned: Map<keyof S, any[]>;
  calledWith: Map<keyof S, any[][]>;
  calledTimes: Map<keyof S, number>;
  throw: Map<keyof S, boolean>;

  resetMocks(): void;
}
