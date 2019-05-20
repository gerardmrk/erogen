export abstract class WithRecords<C> {
  abstract called: Map<keyof C, any[][]>;
  abstract resetMocks(): void;
}

// prettier-ignore
// @ts-ignore
export const recordMock = (): ClassDecorator => <C extends any>(Class: C) => {
  type RecordedMock = C & WithRecords<C>;

  return (...args: any[]): RecordedMock => {
    // @ts-ignore
    const c: RecordedMock = new Class(...args);

    c.called = new Map<keyof C, any[]>();

    const methods: Array<keyof C> = getMethodNames(c);
    methods.forEach(m => {
      const fn = c[m];

      // @ts-ignore
      c[m] = (...args) => {
        const ret = fn(...args);
        
        c.calledWith.set(m, c.calledWith.has(m)
          ? c.calledWith.get(m).push(args)
          : [args]
        );

        c.calledTimes.set(m, c.calledTimes.has(m)
          ? c.calledTimes.get(m) + 1
          : 1
        );

        c.returned.set(m, c.returned.has(m)
          ? c.returned.get(m).push(ret)
          : ret
        );

        return ret;
      }
    });

    return c;
  } 
};

// prettier-ignore
function getMethodNames<C extends WithRecords<C>>(c: C): Array<keyof C> {
  let props: Array<keyof C> = [];

  do {
    // @ts-ignore
    const pp: Array<keyof C> = Object.getOwnPropertyNames(c)
      .concat(Object.getOwnPropertySymbols(c).map(s => s.toString()))
      .sort()
      .filter((p, i, arr) => (
        typeof c[p] === "function" &&
        p !== "constructor" &&
        p !== "__reactstandin__regenerateByEval" &&
        (i == 0 || p !== arr[i - 1]) &&
        props.indexOf(p as keyof C) === -1
      ));

    props = props.concat(pp);
  } while ((c = Object.getPrototypeOf(c)) && Object.getPrototypeOf(c));

  return props;
}
