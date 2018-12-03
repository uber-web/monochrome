import styled from '@emotion/styled';
import {evaluateStyle} from '../shared/theme';

export const Title = styled.div(props => ({
  marginTop: props.theme.spacingNormal,
  marginBottom: props.theme.spacingNormal,
  fontSize: props.theme.fontSize * 2,
  fontWeight: 200,
  ...evaluateStyle(props.userStyle, props)
}));

export const Heading = styled.div(props => ({
  marginTop: props.theme.spacingNormal,
  marginBottom: props.theme.spacingNormal,
  fontSize: props.theme.fontSize * 1.2,
  fontWeight: 600,
  ...evaluateStyle(props.userStyle, props)
}));

export const Separator = styled.div(props => ({
  width: '100%',
  height: 1,
  background: props.theme.controlColorSecondary,
  ...evaluateStyle(props.userStyle, props)
}));
