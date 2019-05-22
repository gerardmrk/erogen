import { reducer, defaultState } from ".";
import { MessageLevel } from "./models";

describe("store/ui-message/state", () => {
  test("default state", () => {
    const next = reducer(undefined, {} as any);
    expect(next).toEqual(defaultState());
    expect(next.display).toBe(false);
    expect(next.level).toBe(MessageLevel.Info);
    expect(next.header).toBeUndefined();
    expect(next.content).toBeUndefined();
    expect(next.list).toBeUndefined();
    expect(typeof next.autoDismiss).toBe("number");
  });

  test("invalid actions", () => {
    expect(reducer(undefined, {} as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "" } as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "-x-o" } as any)).toEqual(defaultState());
  });
});
