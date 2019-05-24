import { Action } from "@client/store";
import { MockErrorsService } from "@client/services/errors/svc.mock";
import errorHandler from "./error-handler";
import { MiddlewareAPI } from ".";
import { show } from "@client/store/state.ui-loader/actions";
import { logoutFailure } from "../state.auth/actions";

describe("store/middleware/error-handler", () => {
  let getState: jest.Mock;
  let dispatch: jest.Mock;
  let dispatchNext: jest.Mock;

  let api: MiddlewareAPI;
  let service: MockErrorsService;

  let handleNext: (action: Action) => void;

  beforeAll(() => {
    getState = jest.fn();
    dispatch = jest.fn();
    dispatchNext = jest.fn();
    api = { getState, dispatch };
    service = new MockErrorsService();
    handleNext = errorHandler(service)(api)(dispatchNext);
  });

  afterEach(() => {
    getState.mockReset();
    dispatch.mockReset();
    dispatchNext.mockReset();
  });

  test("miss", async () => {
    await handleNext(show());
    expect(dispatchNext).toBeCalledTimes(1);
    expect(service.recorded("logError").count).toEqual(0);
    expect(service.recorded("logViewError").count).toEqual(0);
    expect(service.recorded("logStoreError").count).toEqual(0);
  });

  test("hit: handled", async () => {
    const error = new Error("senegal");

    await handleNext(logoutFailure({ message: "tuvalu" }, { error }));
    expect(dispatchNext).toBeCalledTimes(1);
    expect(service.recorded("logError").count).toEqual(0);
    expect(service.recorded("logViewError").count).toEqual(0);
    expect(service.recorded("logStoreError").count).toEqual(1);
    expect(service.recorded("logStoreError").args[0]).toEqual(error);
  });
});
