import { reducer, defaultState, State, Action } from ".";
import * as actions from "./actions";

const state = (changes: Partial<State>): State => ({
  ...defaultState(),
  ...changes,
});

// prettier-ignore
describe("store/i18n/actions", () => {
  test.each<[Action, Partial<State>, Partial<State>]>([
    [
      actions.changeLanguage("zh"),
      {
        lang: "my"
      },
      {
        lang: "zh"
      }
    ],
    [
      actions.changeLanguage("en"),
      {
        lang: "fr"
      },
      {
        lang: "en"
      }
    ],
  ])("A(%o): S(%o) -> S(%o)", (action, prevState, nextState) => {
    expect(reducer(state(prevState), action)).toEqual(state(nextState));
  });
})
