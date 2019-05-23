/**
 * This middleware listens for any error that has been manually assigned
 * to an action's meta payload and handles it accordingly.
 *
 */

import { Middleware, ActionWithMeta } from ".";
import { IErrorsService } from "@client/services/errors";

export const errorHandler = (
  errorsService: IErrorsService,
): Middleware => api => next => action => {
  try {
    next(action);

    if (
      !(action as ActionWithMeta).meta ||
      !(action as ActionWithMeta).meta.error
    ) {
      return;
    }

    errorsService.logStoreError(
      (action as ActionWithMeta).meta.error as Error,
      api.getState(),
    );
  } catch (err) {
    errorsService.logStoreError(err, api.getState(), { unhandled: true });
  }
};

export default errorHandler;
