import { reducer, defaultState } from ".";

describe("store/ui-loader/state", () => {
  test("default state", () => {
    const next = reducer(undefined, {} as any);
    expect(next).toEqual(defaultState());
    expect(next.loading).toBe(false);
    expect(next.message).toBeUndefined();
  });

  test("invalid actions", () => {
    expect(reducer(undefined, {} as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "" } as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "-x-o" } as any)).toEqual(defaultState());
  });
});
