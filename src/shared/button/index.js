import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

const BUTTON_TYPE = {
  NORMAL: 0,
  PRIMARY: 1,
  WARNING: 2,
  MUTED: 3
};

function getBackgroundColor(props) {
  if (props.type === BUTTON_TYPE.MUTED) {
    return props.theme.background;
  }
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }

  switch (props.type) {
    case BUTTON_TYPE.PRIMARY:
      return props.isHovered ? props.theme.primary500 : props.theme.controlColorActive;
    case BUTTON_TYPE.WARNING:
      return props.isHovered ? props.theme.warning500 : props.theme.warning400;
    case BUTTON_TYPE.NORMAL:
    default:
      return props.isHovered ? props.theme.controlColorHovered : props.theme.controlColorPrimary;
  }
}

function getTextColor(props) {
  if (props.type !== BUTTON_TYPE.MUTED) {
    return props.theme.textColorInvert;
  }
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }
  if (props.isHovered) {
    return props.theme.controlColorHovered;
  }
  return props.theme.controlColorPrimary;
}

const WrapperComponent = styled.button(props => ({
  ...props.theme.__reset__,
  outline: 'none',
  display: 'inline-block',

  boxSizing: 'border-box',
  border: 'none',
  paddingLeft: props.theme.spacingNormal,
  paddingRight: props.theme.spacingNormal,
  height: props.size,
  lineHeight: `${props.size}px`,

  textAlign: 'center',
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  background: getBackgroundColor(props),
  color: getTextColor(props),
  ...evaluateStyle(props.userStyle, props)
}));

// Input component that can be toggled on and off
class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(BUTTON_TYPE)),
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    type: BUTTON_TYPE.NORMAL,
    className: '',
    style: {},
    isEnabled: true
  };

  state = {
    isHovered: false
  };

  _onMouseEnter = () => this.setState({isHovered: true});
  _onMouseLeave = () => this.setState({isHovered: false});
  _onFocus = () => this.setState({hasFocus: true});
  _onBlur = () => this.setState({hasFocus: false});

  _onClick = () => {
    this.props.onChange(!this.props.value);
  };

  render() {
    const {theme, type, className, style, isEnabled, onClick} = this.props;
    const {size = theme.controlSize + theme.spacingTiny * 2} = style;

    const styleProps = {
      type,
      theme,
      size,
      hasFocus: this.state.hasFocus,
      isHovered: this.state.isHovered,
      isEnabled
    };

    return (
      <WrapperComponent
        className={className}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onClick={onClick}
        userStyle={style.wrapper}
        {...styleProps}
      >
        {this.props.children}
      </WrapperComponent>
    );
  }
}

const ThemedButton = withTheme(Button);
Object.assign(ThemedButton, BUTTON_TYPE);

export default ThemedButton;
