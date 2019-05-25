import { Store, reducer } from "@client/store";
import postLogin from "./post-login";
import { MiddlewareAPI } from ".";
import { show } from "@client/store/state.ui-loader/actions";
import { loginSuccess } from "../state.auth/actions";
import { createStore } from "redux";

describe("store/middleware/post-login", () => {
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
    const dispatchNext = postLogin()(api)(next);
    await dispatchNext(show());

    expect(next).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(0);
  });

  test("hit", async () => {
    const dispatchNext = postLogin()(api)(next);
    await dispatchNext(loginSuccess({ accessToken: "maputo" }, {}));

    expect(next).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
  });
});
