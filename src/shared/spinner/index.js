import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {keyframes} from '@emotion/core';

import {withTheme, evaluateStyle} from '../theme';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PreLoader = styled.div(props => ({
  width: props.size,
  height: props.size,
  marginLeft: -props.size / 2,
  marginTop: props.theme.spacingNormal,
  marginBottom: props.theme.spacingNormal,
  left: '50%',
  borderRadius: '50%',
  position: 'absolute',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: props.theme.controlColorActive,
  clipPath: 'polygon(50% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
  animation: `${spin} 1s ease infinite`,

  ...evaluateStyle(props.userStyle, props)
}));

class Spinner extends PureComponent {
  static propTypes = {
    style: PropTypes.object
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const {theme, style} = this.props;
    const {size = 32} = style;
    return <PreLoader size={size} theme={theme} userStyle={style} />;
  }
}

export default withTheme(Spinner);
