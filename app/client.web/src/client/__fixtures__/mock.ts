import { FunctionKeys, Omit } from "utility-types";

export type RecordableName<T extends object> = FunctionKeys<
  Omit<
    T,
    "recorded" | "returnFor" | "throwFor" | "resetFor" | "resetAll" | "records"
  >
>;

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
  recorded(mname: RecordableName<T>): Recorded<any>;
  resetFor(mname: RecordableName<T>): void;
  resetAll(): void;

  throwFor(mname: RecordableName<T>, err: Error): void;
  returnFor(mname: RecordableName<T>, ret: any): void;

  records: RecordedMap<T, RecordableName<T>>;
  throws: ThrowsMap<T, RecordableName<T>>;
  returns: ReturnsMap<T, RecordableName<T>>;
}
