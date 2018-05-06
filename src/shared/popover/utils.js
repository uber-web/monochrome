import {POSITIONS} from './popover';

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function getOppositePosition(side) {
  switch (side) {
    case POSITIONS.TOP:
      return POSITIONS.BOTTOM;
    case POSITIONS.RIGHT:
      return POSITIONS.LEFT;
    case POSITIONS.BOTTOM:
      return POSITIONS.TOP;
    case POSITIONS.LEFT:
      return POSITIONS.RIGHT;
    default:
      return POSITIONS.BOTTOM;
  }
}

export function nodeHasParent(current, possibleParent) {
  if (current === possibleParent) {
    return true;
  }
  while (current.parentNode) {
    if (current === possibleParent) {
      return true;
    }
    current = current.parentNode;
  }
  return false;
}

export function positionsToPopperPlacement(position, arrowPosition) {
  let placement = position || POSITIONS.AUTO;
  if (arrowPosition === POSITIONS.LEFT || arrowPosition === POSITIONS.TOP) {
    placement = `${placement}-start`;
  }
  if (arrowPosition === POSITIONS.RIGHT || arrowPosition === POSITIONS.BOTTOM) {
    placement = `${placement}-end`;
  }
  return placement;
}
