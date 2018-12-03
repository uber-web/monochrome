import styled from '@emotion/styled';

import {evaluateStyle} from '../shared/theme';

export const ListContainer = styled.div(props => ({
  ...props.theme.__reset__,
  userSelect: 'none',
  ...evaluateStyle(props.userStyle, props)
}));

export const ListItemContainer = styled.div(props => {
  const style = props.isActive
    ? {
        boxSizing: 'border-box',
        position: 'fixed',
        zIndex: 999,
        transitionProperty: 'all',
        transitionTimingFunction: props.theme.transitionTimingFunction,
        transitionDuration: props.isDragging ? 0 : props.theme.transitionDuration,
        boxShadow: props.theme.shadow
      }
    : {};

  return Object.assign(style, evaluateStyle(props.userStyle, props));
});

export const ListItemTitle = styled.div(props => ({
  ...evaluateStyle(props.userStyle, props)
}));

export const ListItemPlaceholder = styled.div(props => ({
  boxSizing: 'border-box',
  transitionProperty: 'height',
  transitionTimingFunction: props.theme.transitionTimingFunction,
  transitionDuration: props.theme.transitionDuration,
  borderStyle: 'dotted',
  borderColor: props.theme.controlColorPrimary,
  borderWidth: 2,

  ...evaluateStyle(props.userStyle, props)
}));
