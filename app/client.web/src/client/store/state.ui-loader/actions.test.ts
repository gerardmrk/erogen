import { reducer, defaultState, State, Action } from ".";
import * as actions from "./actions";

const state = (changes: Partial<State>): State => ({
  ...defaultState(),
  ...changes,
});

// prettier-ignore
describe("store/ui-loader/actions", () => {
  test.each<[Action, Partial<State>, Partial<State>]>([
    [
      actions.show("luxembourg"),
      {},
      {
        loading: true,
        message: "luxembourg"
      }
    ],
    [
      actions.hide(),
      {
        loading: true,
        message: "berlin"
      },
      {
        loading: false,
        message: undefined
      },
    ],
    
  ])("A(%o): S(%o) -> S(%o)", (action, prevState, nextState) => {
    expect(reducer(state(prevState), action)).toEqual(state(nextState));
  });
})
