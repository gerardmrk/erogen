/**
 * This middleware listens for any error that has been manually assigned
 * to an action's meta payload and handles it accordingly.
 *
 */

import { Middleware, ActionWithMeta } from ".";
import { IErrorsService } from "@client/services/errors";

export const errorHandler = (
  errorsService: IErrorsService,
): Middleware => api => next => async action => {
  try {
    next(action);

    if (
      !(action as ActionWithMeta).meta ||
      !(action as ActionWithMeta).meta.error
    ) {
      return;
    }

    await errorsService.logStoreError(
      (action as ActionWithMeta).meta.error as Error,
      api.getState(),
    );
  } catch (err) {
    await errorsService.logStoreError(err, api.getState(), { unhandled: true });
  }
};

export default errorHandler;
