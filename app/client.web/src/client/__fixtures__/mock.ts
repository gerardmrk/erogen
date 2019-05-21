import { FunctionKeys, Omit } from "utility-types";

export type Recorded<M extends (...args: any) => any> = {
  count: number;
  args: Array<Parameters<M>>;
  rets: Array<ReturnType<M>>;
};

export type RecordedMap<T extends object, K extends keyof T> = Map<
  K,
  T[K] extends (...args: any) => any ? Recorded<T[K]> : never
>;

export type ThrowsMap<T extends object, K extends keyof T> = Map<
  K,
  T[K] extends (...args: any) => any ? Error : never
>;

export type ReturnsMap<T extends object, K extends keyof T> = Map<
  K,
  T[K] extends (...args: any) => any ? ReturnType<T[K]> : never
>;

// prettier-ignore
export interface IMock<T extends object> {
  resetFor(mname: FunctionKeys<T>): void;
  resetAll(): void;

  throwFor(mname: FunctionKeys<T>, err: Error): void;
  returnFor(mname: FunctionKeys<T>, ret: any): void;

  recorded: RecordedMap<T, FunctionKeys<Omit<T, "returnFor" | "throwFor" | "resetFor" | "resetAll" | "recorded">>>;
  throws: ThrowsMap<T, FunctionKeys<Omit<T, "returnFor" | "throwFor" | "resetFor" | "resetAll" | "recorded">>>;
  returns: ReturnsMap<T, FunctionKeys<Omit<T, "returnFor" | "throwFor" | "resetFor" | "resetAll" | "recorded">>>;
}
