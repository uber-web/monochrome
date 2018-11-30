/**
 * Make sure value is within range
 * @params {number} value - input value
 * @params {number} min - lower bound
 * @params {number} max - upper bound
 * @returns {number} - clamped value
 */
export function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
