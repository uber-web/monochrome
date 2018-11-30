import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

import Label from '../label';

const STYLE_STRETCHER = {flexGrow: 1};

function getControlColor(props) {
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  } else if (props.value) {
    return props.theme.controlColorActive;
  } else if (props.isHovered) {
    return props.theme.controlColorHovered;
  }
  return props.theme.controlColorPrimary;
}

const WrapperComponent = styled.div(props => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  ...evaluateStyle(props.userStyle, props)
}));

const ToggleComponent = styled.div(props => ({
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
  background: getControlColor(props),
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
  borderColor: getControlColor(props),
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
    label: PropTypes.string,
    tooltip: PropTypes.string,
    badge: PropTypes.element,
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
    isHovered: false
  };

  _onMouseEnter = () => {
    this.setState({isHovered: true});
  };

  _onMouseEnter = () => this.setState({isHovered: true});

  _onMouseLeave = () => this.setState({isHovered: false});

  _onClick = () => {
    this.props.onChange(!this.props.value);
  };

  render() {
    const {theme, className, style, value, label, tooltip, badge, isEnabled} = this.props;
    const {knobSize = theme.controlSize} = style;

    const styleProps = {
      theme,
      knobSize,
      value,
      isHovered: this.state.isHovered,
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
        {label && (
          <Label isEnabled={isEnabled} style={style.label} tooltip={tooltip} badge={badge}>
            {label}
          </Label>
        )}
        <div style={STYLE_STRETCHER} />
        <ToggleComponent userStyle={style.toggle} {...styleProps}>
          <ToggleTrack userStyle={style.track} {...styleProps} />
          <ToggleKnob userStyle={style.knob} {...styleProps} />
        </ToggleComponent>
      </WrapperComponent>
    );
  }
}

export default withTheme(Toggle);
