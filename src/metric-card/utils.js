const DEFAULT_GET_X = d => d.x;
/**
 * Performs binary search for the closest value to timestamp in a metric
 * @param {array} array - array of values sorted by x
 * @param {number} x - the target x value
 * @param {function, optional} getX - x accessor
 * @returns {object} nearest value
 */
export function findNearestValue(array, x, getX = DEFAULT_GET_X) {
  let lowerBound = 0;
  let upperBound = array.length - 1;
  let currentIndex;
  let currentX;

  while (lowerBound <= upperBound) {
    currentIndex = ((lowerBound + upperBound) / 2) | 0;
    currentX = getX(array[currentIndex]);

    if (currentX < x) {
      lowerBound = currentIndex + 1;
    } else if (currentX > x) {
      upperBound = currentIndex - 1;
    } else {
      return array[currentIndex];
    }
  }

  // No precise match, find the closer one between the two bounds
  const lowerValue = array[lowerBound];
  const upperValue = array[upperBound];

  if (!lowerValue) {
    // at end of array
    return upperValue;
  }
  if (!upperValue) {
    // at beginning of array
    return lowerValue;
  }

  return Math.abs(getX(lowerValue) - x) <= Math.abs(getX(upperValue) - x) ? lowerValue : upperValue;
}
