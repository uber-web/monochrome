import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

const WrapperComponent = styled.div(props => ({
  ...props.theme.__reset__,
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
  ...evaluateStyle(props.userStyle, props)
}));

const ToggleComponent = styled.div(props => ({
  outline: 'none',
  position: 'relative',
  height: props.knobSize,
  width: props.knobSize * 2,
  flexShrink: 0,
  ...evaluateStyle(props.userStyle, props)
}));

const ToggleTrack = styled.div(props => ({
  boxSizing: 'border-box',
  position: 'absolute',
  width: '100%',
  height: 2,
  background: props.isEnabled
    ? props.value
      ? props.theme.controlColorActive
      : props.theme.controlColorPrimary
    : props.theme.controlColorDisabled,
  top: '50%',
  transform: 'translateY(-50%)',
  ...evaluateStyle(props.userStyle, props)
}));

const ToggleKnob = styled.div(props => ({
  boxSizing: 'border-box',
  position: 'absolute',
  width: props.knobSize,
  height: props.knobSize,

  background: props.theme.background,
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: props.isEnabled
    ? props.isHovered
      ? props.theme.controlColorHovered
      : props.hasFocus
      ? props.theme.controlColorActive
      : props.theme.controlColorPrimary
    : props.theme.controlColorDisabled,
  borderRadius: '50%',
  left: props.value ? `calc(100% - ${props.knobSize}px)` : 0,

  transitionProperty: 'left',
  transitionDuration: props.theme.transitionDuration,
  transitionTimingFunction: props.theme.transitionTimingFunction,

  ...evaluateStyle(props.userStyle, props)
}));

// Input component that can be toggled on and off
class Toggle extends PureComponent {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.node,
    style: PropTypes.object,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    value: true,
    style: {},
    isEnabled: true,
    onChange: () => {}
  };

  state = {
    hasFocus: false,
    isHovered: false
  };

  _onMouseEnter = () => this.setState({isHovered: true});
  _onMouseLeave = () => this.setState({isHovered: false});
  _onFocus = () => this.setState({hasFocus: true});
  _onBlur = () => this.setState({hasFocus: false});

  _onKeyDown = evt => {
    if (evt.keyCode === 32) {
      // space
      this.props.onChange(!this.props.value);
    }
  };

  _onClick = () => {
    this.props.onChange(!this.props.value);
  };

  render() {
    const {theme, className, style, value, label, isEnabled} = this.props;
    const {knobSize = theme.controlSize} = style;

    const styleProps = {
      theme,
      knobSize,
      value,
      isHovered: this.state.isHovered,
      hasFocus: this.state.hasFocus,
      isEnabled
    };

    return (
      <WrapperComponent
        className={className}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
        userStyle={style.wrapper}
        {...styleProps}
      >
        {label}

        <ToggleComponent
          userStyle={style.toggle}
          {...styleProps}
          tabIndex={isEnabled ? 0 : -1}
          onKeyDown={this._onKeyDown}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
        >
          <ToggleTrack userStyle={style.track} {...styleProps} />
          <ToggleKnob userStyle={style.knob} {...styleProps} />
        </ToggleComponent>
      </WrapperComponent>
    );
  }
}

export default withTheme(Toggle);
