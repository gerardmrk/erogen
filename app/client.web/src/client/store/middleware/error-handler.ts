import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import { IErrorReporterService } from "@client/services/error-reporter";

export const errorHandler = (
  errorReporterService: IErrorReporterService,
): Middleware => (api: MiddlewareAPI) => (next: Dispatcher) => (
  action: Action,
) => {
  next(action);

  if (!(<ActionWithMeta>action).meta || !(<ActionWithMeta>action).meta.error) {
    return;
  }

  errorReporterService.logError((<ActionWithMeta>action).meta.error as Error);
};

export default errorHandler;
