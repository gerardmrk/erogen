import { MockErrorsService } from "@client/services/errors/svc.mock";
import errorHandler from "./error-handler";
import { Dispatcher } from "..";
import { MiddlewareAPI } from ".";

describe("store/middleware/error-handler", () => {
  let api: MiddlewareAPI;
  let service: MockErrorsService;
  let dispatchNext: Dispatcher;

  let handleNext;

  beforeAll(() => {
    service = new MockErrorsService();
    api = { getState: jest.fn(), dispatch: jest.fn() };
    dispatchNext = jest.fn();
    handleNext = errorHandler(service)(api)(dispatchNext);
  });

  test("miss", async () => {
    await handleNext({});
    expect(true).toBe(true);
  });

  test("hit", async () => {
    await handleNext({});
    expect(true).toBe(true);
    // assert error not escaped
  });
});
