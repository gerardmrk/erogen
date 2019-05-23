import { reducer, defaultState } from ".";

describe("store/auth/state", () => {
  test("default state", () => {
    const next = reducer(undefined, {} as any);
    expect(next).toEqual(defaultState());
    expect(next.authKeys).not.toBeDefined();
    expect(next.error).not.toBeDefined();
    expect(next.isLoading).toBe(false);
    expect(next.isAuthenticated).toBe(false);
  });

  test("invalid actions", () => {
    expect(reducer(undefined, {} as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "" } as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "-x-o" } as any)).toEqual(defaultState());
  });
});
