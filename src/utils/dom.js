/**
 * Get CSS vendor prefix
 * @returns {string} - vendor prefix if any
 */
export function getCSSVendorPrefix() {
  /* global document */
  if (typeof document !== 'undefined') {
    const styleObj = document.body.style;
    const prefix = /^(webkit|moz|ms|o)(?=[A-Z])/;
    for (const key in styleObj) {
      if (prefix.test(key)) {
        return `-${key.match(prefix)[0]}-`;
      }
    }
  }
  return '';
}
