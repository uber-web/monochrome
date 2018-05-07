/**
 * Get page offset of a DOM element
 * @params {DOMElement} - element
 * @returns {object} - {left: number, top: number}
 */
export function getPageOffset(element) {
  let obj = element;
  let left = 0;
  let top = 0;
  while (obj && Number.isFinite(obj.offsetLeft)) {
    left += obj.offsetLeft;
    top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return {left, top};
}

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
