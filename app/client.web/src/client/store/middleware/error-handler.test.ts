import { Store, reducer } from "@client/store";
import { MockErrorsService } from "@client/services/errors/svc.mock";
import errorHandler from "./error-handler";
import { MiddlewareAPI } from ".";
import { show } from "@client/store/state.ui-loader/actions";
import { logoutFailure } from "../state.auth/actions";
import { createStore } from "redux";

describe("store/middleware/error-handler", () => {
  let store: Store;
  let api: MiddlewareAPI;
  let service: MockErrorsService;

  let next: jest.Mock;
  let dispatch: jest.Mock;

  beforeAll(() => {
    next = jest.fn();
    dispatch = jest.fn();

    store = createStore(reducer);
    service = new MockErrorsService();
    api = { dispatch, getState: store.getState };
  });

  afterEach(() => {
    service.resetAll();
    dispatch.mockClear();
    next.mockClear();
  });

  test("miss", async () => {
    const dispatchNext = errorHandler(service)(api)(next);
    await dispatchNext(show());

    expect(next).toBeCalledTimes(1);
    expect(service.recorded("logError").count).toEqual(0);
    expect(service.recorded("logViewError").count).toEqual(0);
    expect(service.recorded("logStoreError").count).toEqual(0);
  });

  test("hit: handled", async () => {
    const error = new Error("senegal");
    const dispatchNext = errorHandler(service)(api)(next);
    await dispatchNext(logoutFailure({ message: "tuvalu" }, { error }));

    expect(next).toBeCalledTimes(1);
    expect(service.recorded("logError").count).toEqual(0);
    expect(service.recorded("logViewError").count).toEqual(0);
    expect(service.recorded("logStoreError").count).toEqual(1);
    expect(service.recorded("logStoreError").args[0]).toEqual([error, store.getState()]); // prettier-ignore
  });
});
