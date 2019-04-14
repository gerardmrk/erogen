import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI } from ".";
import { IErrorReporterService } from "@client/services/error-reporter";

export const errorHandler = (
  errorReporterService: IErrorReporterService,
): Middleware => (api: MiddlewareAPI) => (next: Dispatcher) => (
  action: Action,
) => {
  next(action);

  if (!(<any>action).payload || !(<any>action).payload.error) {
    return;
  }

  errorReporterService.logError((<any>action).payload.error);
};

export default errorHandler;
