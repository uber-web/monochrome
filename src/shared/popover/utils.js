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

/**
 * Some of this logic for generating arrows may seem rather complicated.
 * Normally Popper.js has an accompanying css file with some of the necessary
 * rules, but in the interest of having zero css dependencies, we'll move
 * this styling/positioning logic into js
 */
export function generateTriangleStyles(position, size) {
  // Generate borderWidth & borderColor rules
  const positions = [POSITIONS.TOP, POSITIONS.RIGHT, POSITIONS.BOTTOM, POSITIONS.LEFT];
  // Set border width to zero for opposite position
  const oppositePosition = getOppositePosition(position);
  const style = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid'
  };

  for (const p of positions) {
    const key = capitalize(p);
    const width = p === oppositePosition ? 0 : size;
    const color = p === position ? undefined : 'transparent';
    style[`border${key}Width`] = width;
    style[`border${key}Color`] = color;
  }

  return style;
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
