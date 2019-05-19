import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import { IErrorsService } from "@client/services/errors";

export const errorHandler = (errorsService: IErrorsService): Middleware => (
  api: MiddlewareAPI,
) => (next: Dispatcher) => (action: Action) => {
  next(action);

  if (!(<ActionWithMeta>action).meta || !(<ActionWithMeta>action).meta.error) {
    return;
  }

  errorsService.logError((<ActionWithMeta>action).meta.error as Error);
};

export default errorHandler;
