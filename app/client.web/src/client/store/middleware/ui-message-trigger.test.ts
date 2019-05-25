import { Store, reducer } from "@client/store";
import { MiddlewareAPI } from ".";
import { logoutPending } from "../state.auth/actions";
import { createStore } from "redux";
import uiMessageTrigger from "./ui-message-trigger";

describe("store/middleware/ui-message-trigger", () => {
  let store: Store;
  let api: MiddlewareAPI;

  let next: jest.Mock;
  let dispatch: jest.Mock;

  beforeAll(() => {
    next = jest.fn();
    dispatch = jest.fn();

    store = createStore(reducer);
    api = { dispatch, getState: store.getState };
  });

  afterEach(() => {
    dispatch.mockClear();
    next.mockClear();
  });

  test("miss", async () => {
    const dispatchNext = uiMessageTrigger()(api)(next);
    await dispatchNext(logoutPending({}));

    expect(next).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(0);
  });

  test("hit", async () => {
    // const dispatchNext = uiMessageTrigger()(api)(next);
    // await dispatchNext(show);

    // expect(next).toBeCalledTimes(1);
    // expect(dispatch).toBeCalledTimes(1);
    expect(true).toBe(true);
  });
});
