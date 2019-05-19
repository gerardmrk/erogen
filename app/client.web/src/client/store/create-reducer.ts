import { Reducer, Action } from "typesafe-actions";

export interface ActionHandler<S, A extends Action> {
  (state: S, action: A): S;
}

export type ActionHandlers<S, A extends Action> = {
  [K in A["type"]]: ActionHandler<S, A extends { type: K } ? A : never>
};

export const createReducer = <S, A extends Action>(
  defaultState: S,
  handlers: ActionHandlers<S, A>,
): Reducer<S, A> => {
  // convert to Map to get rid of Object prototype to skip
  // `hasOwnProperty` checks for faster lookup time
  const mappings: Map<A["type"], ActionHandler<S, A>> = new Map(
    Object.entries(handlers),
  );

  const emptyHandler = (state: S, action: A): S => state;

  return (state: S = defaultState, action: A) => {
    return (mappings.get(action.type) || emptyHandler)(state, action);
  };
};
