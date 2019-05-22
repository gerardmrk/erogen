import { reducer, defaultState } from ".";

describe("store/i18n/state", () => {
  test("default state", () => {
    const next = reducer(undefined, {} as any);
    expect(next).toEqual(defaultState());
    expect(next.lang).toBeDefined();
  });

  test("invalid actions", () => {
    expect(reducer(undefined, {} as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "" } as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "-x-o" } as any)).toEqual(defaultState());
  });
});
