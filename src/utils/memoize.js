function isEqual(arr1, arr2) {
  const len = arr1.length;
  if (len !== arr2.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Speed up consecutive function calls by caching the result of calls with identical input
 * https://en.wikipedia.org/wiki/Memoization
 * @param {function} compute - the function to be memoized
 */
export default function memoize(compute) {
  let cachedArgs = [];
  let cachedResult;

  return function memoizedFunc() {
    if (!isEqual(arguments, cachedArgs)) {
      cachedResult = compute.apply(this, arguments);
      cachedArgs = Array.from(arguments);
    }
    return cachedResult;
  };
}
