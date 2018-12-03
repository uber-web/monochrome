import styled from '@emotion/styled';
import {evaluateStyle} from '../shared/theme';

// Table
export const WrapperComponent = styled.div(props => ({
  ...props.theme.__reset__,
  display: 'flex',
  flexDirection: 'column',
  ...evaluateStyle(props.userStyle, props)
}));

export const TableBody = styled.div(props => ({
  flex: '1 1 auto',
  ...evaluateStyle(props.userStyle, props)
}));

// TableHeader
export const HeaderContainer = styled.div(props => ({
  display: 'table',
  flex: '0 0 auto',
  ...evaluateStyle(props.userStyle, props)
}));

export const HeaderCell = styled.div(props => ({
  cursor: 'pointer',
  display: 'table-cell',
  position: 'relative',

  fontWeight: 'bold',
  background:
    props.isAscending || props.isDescending
      ? props.theme.controlColorActive
      : props.theme.controlColorPrimary,
  color: props.theme.textColorInvert,
  paddingTop: props.theme.spacingTiny,
  paddingBottom: props.theme.spacingTiny,
  paddingLeft: props.theme.spacingSmall,
  paddingRight: props.theme.spacingSmall,

  '&:hover': {
    background: props.theme.controlColorHovered
  },

  ...evaluateStyle(props.userStyle, props)
}));

export const SortIcon = styled.div(props => ({
  position: 'absolute',
  right: props.theme.spacingTiny,
  bottom: props.theme.spacingTiny,
  ...evaluateStyle(props.userStyle, props)
}));

export const TableRowComponent = styled.div(props => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'stretch',
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
  borderBottomColor: props.theme.controlColorSecondary,
  ...evaluateStyle(props.userStyle, props)
}));

export const TableCell = styled.div(props => ({
  flex: '0 0 auto',
  overflow: 'hidden',
  boxSizing: 'border-box',
  position: 'relative',

  paddingTop: props.theme.spacingTiny,
  paddingBottom: props.theme.spacingTiny,
  paddingLeft: props.theme.spacingSmall,
  paddingRight: props.theme.spacingSmall,

  borderLeftStyle: 'solid',
  borderLeftWidth: props.index === 0 ? 0 : 1,
  borderLeftColor: props.theme.controlColorSecondary,

  ...evaluateStyle(props.userStyle, props)
}));

export const Expander = styled.div(props => ({
  position: 'absolute',
  cursor: 'pointer',
  left: -props.theme.spacingSmall,
  ...evaluateStyle(props.userStyle, props)
}));
