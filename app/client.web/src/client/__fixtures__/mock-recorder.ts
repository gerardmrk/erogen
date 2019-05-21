import { IMock } from "./mock";
import { Omit } from "utility-types";

// prettier-ignore
// @ts-ignore
export const recordMock = (): ClassDecorator => <C extends IMock<C>>(Class: C) => {
  return function(args: any[]): C {
    // @ts-ignore
    const c: RecordedMock = new Class(args);

    // convenience setups

    if (!c.recorded) {
      console.warn(`'${c.constructor.name}.recorded' undeclared. Setting default`);
      c.recorded = new Map();
    }

    if (!c.returns) {
      console.warn(`'${c.constructor.name}.returns' undeclared. Setting default`);
      c.returns = new Map();
    }

    if (!c.throws) {
      console.warn(`'${c.constructor.name}.throws' undeclared. Setting default`);
      c.throws = new Map();
    }

    if (!c.resetAll) {
      console.warn(`'${c.constructor.name}.resetAll()' undeclared. Setting default`);
      c.resetAll = () => {
        c.returns.clear();
        c.throws.clear();
        c.recorded.clear();
      }
    }

    if (!c.resetFor) {
      console.warn(`'${c.constructor.name}.resetFor()' undeclared. Setting default`);
      c.resetFor = (m) => {
        c.returns.delete(m);
        c.throws.delete(m);
        c.recorded.delete(m);
      }
    }

    if (!c.throwFor) {
      console.warn(`'${c.constructor.name}.throwFor()' undeclared. Setting default`);
      c.throwFor = (m, err) => { c.throws.set(m, err); }
    }

    if (!c.returnFor) {
      console.warn(`'${c.constructor.name}.returnFor()' undeclared. Setting default`);
      c.returnFor = (m, ret) => { c.returns.set(m, ret); }
    }

    const methods = getMethodNames(c);

    methods.forEach(m => {
      const fn = c[m];
      // @ts-ignore
      c[m] = (aa) => {
        let prev = c.recorded.get(m);
        if (!prev) prev = { count: 0, args: [], rets: [] };

        let ret;
        if (c.returns.has(m)) {
          ret = c.returns.get(m);
        } else {
          ret = fn(aa);
        }

        c.recorded.set(m, {
          count: prev.count + 1,
          args: [...prev.args, aa],
          rets: [...prev.rets, ret]
        });

        if (c.throws.has(m)) throw c.throws.get(m);
        return ret;
      }
    });

    return c;
  } 
};

// prettier-ignore
function getMethodNames<C extends IMock<C>>(c: C): Array<keyof Omit<C, "resetFor" | "resetAll">> {
  let props: Array<keyof Omit<C, "resetFor" | "resetAll">> = [];

  do {
    // @ts-ignore
    const pp: Array<keyof Omit<C, "resetFor" | "resetAll">> = Object
      .getOwnPropertyNames(c)
      .concat(Object.getOwnPropertySymbols(c).map(s => s.toString()))
      .sort()
      .filter((p, i, arr) => (
        typeof c[p] === "function" &&
        p !== "constructor" &&
        p !== "__reactstandin__regenerateByEval" &&
        p !== "resetAll" &&
        p !== "resetFor" &&
        p !== "throwFor" &&
        p !== "returnFor" &&
        (i == 0 || p !== arr[i - 1]) &&
        props.indexOf(p as keyof Omit<C, "resetFor" | "resetAll">) === -1
      ));

    props = props.concat(pp);
  } while ((c = Object.getPrototypeOf(c)) && Object.getPrototypeOf(c));

  return props;
}
