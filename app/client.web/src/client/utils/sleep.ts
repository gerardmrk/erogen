/**
 * use this to simulate latency for services
 * or to simulate slow loading ui
 */
export const sleep = async (ms: number): Promise<void> =>
  new Promise(
    (resolve: (value: void) => void): NodeJS.Timeout => setTimeout(resolve, ms),
  );
