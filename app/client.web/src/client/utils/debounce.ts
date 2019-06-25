/**
 * credits:
 * https://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript/24004925#24004925
 *
 * @param fn the function to call per interval
 * @param duration the debounce duration
 * @param immediate whether to immediately call the function before counting down
 */
export const debounce = <FN extends (...args: any) => void>(
  fn: FN,
  duration: number,
  immediate: boolean = false,
) => {
  let timeout;

  return (...args: Parameters<typeof fn>) => {
    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    let callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this
    //   function several times, but it will only execute once
    //   [before or after imposing a delay].
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(() => {
      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        fn(...args);
      }
    }, duration);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) {
      fn(...args);
    }
  };
};
