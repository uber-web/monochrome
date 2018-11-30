// Calculate the overlap between two DOMRects.
// Returns a number in square pixels
export function overlap(rect1, rect2) {
  const overlapX = Math.min(rect1.right - rect2.left, rect2.right - rect1.left);
  const overlapY = Math.min(rect1.bottom - rect2.top, rect2.bottom - rect1.top);

  if (overlapX < 0 || overlapY < 0) {
    return 0;
  }
  return overlapX * overlapY;
}

export function offsetRect(rect, [dx = 0, dy = 0]) {
  return {
    left: rect.left + dx,
    top: rect.top + dy,
    right: rect.right + dx,
    bottom: rect.bottom + dy,
    width: rect.width,
    height: rect.height
  };
}
