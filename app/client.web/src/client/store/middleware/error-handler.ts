import { Middleware, ActionWithMeta } from ".";
import { IErrorsService } from "@client/services/errors";

export const errorHandler = (
  errorsService: IErrorsService,
): Middleware => api => next => action => {
  next(action);

  if (
    !(action as ActionWithMeta).meta ||
    !(action as ActionWithMeta).meta.error
  ) {
    return;
  }

  errorsService.logError((action as ActionWithMeta).meta.error as Error);
};

export default errorHandler;
