/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */

/**
 * Takes any number of arguments and return an array with falsy values removed.
 * @param  {...any} args ...
 */
exports.compact = (...args) => args.filter(val => !!val);
