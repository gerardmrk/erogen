import { reducer, defaultState, State, Action, DEFAULT_TTL } from ".";
import * as actions from "./actions";
import { MessageLevel } from "./models";

const state = (changes: Partial<State>): State => ({
  ...defaultState(),
  ...changes,
});

// prettier-ignore
describe("store/ui-message/actions", () => {
  test.each<[Action, Partial<State>, Partial<State>]>([
    [
      actions.show({ level: MessageLevel.Success, autoDismiss: 2427 }),
      {
        display: false,
      },
      {
        display: true,
        level: MessageLevel.Success,
        autoDismiss: 2427
      }
    ],
    [
      actions.show({ content: "jakarta" }),
      {
        display: false,
        content: "madrid",
      },
      {
        display: true,
        level: MessageLevel.Info,
        content: "jakarta",
        autoDismiss: DEFAULT_TTL
      }
    ],
    [
      actions.hide(),
      {
        display: true,
        level: MessageLevel.Error,
        content: "wisconsin",
        autoDismiss: false as false
      },
      {
        display: false,
        level: MessageLevel.Error,
        content: "wisconsin",
        autoDismiss: DEFAULT_TTL
      },
    ],
    
  ])("A(%o): S(%o) -> S(%o)", (action, prevState, nextState) => {
    expect(reducer(state(prevState), action)).toEqual(state(nextState));
  });
})
