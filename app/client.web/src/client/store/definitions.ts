import { Action } from "typesafe-actions";

/**
 * Describes a state which handles asynchronous actions.
 */
export type AsyncState<A extends Action> = {
  isLoading: AsyncStateLoadingFlag;
  error: AsyncStateError<A>;
};

/**
 * Indicates an asynchronous action is in progress.
 */
export type AsyncStateLoadingFlag = boolean;

/**
 * Indicates an error occurence from an asynchronous action.
 */
export type AsyncStateError<A extends Action> =
  | undefined
  | {
      /**
       * the HTTP status code, if the error is from network request.
       */
      status?: number;

      /**
       * the custom API/SDK error code, if one is provided.
       */
      code?: string;

      /**
       * the error message
       */
      message: string;

      /**
       * the action type where the error originated from.
       */
      actionType?: A["type"];
    };
