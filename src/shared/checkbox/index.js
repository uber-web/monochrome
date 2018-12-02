import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

import Label from '../label';

const CHECKBOX_STATE = {
  OFF: 'off',
  INDETERMINATE: 'indeterminate',
  ON: 'on'
};

const CheckBoxComponent = styled.div(props => ({
  ...props.theme.__reset__,
  display: 'flex',
  alignItems: 'center',

  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',

  ...evaluateStyle(props.userStyle, props)
}));

const CheckBoxBorder = styled.div(props => ({
  display: 'inline-block',
  position: 'relative',
  width: props.size,
  height: props.size,

  flexShrink: 0,
  marginRight: props.theme.spacingSmall,
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: props.isEnabled
    ? props.isHovered
      ? props.theme.controlColorHovered
      : props.theme.controlColorPrimary
    : props.theme.controlColorDisabled,
  color: props.isEnabled ? props.theme.controlColorActive : props.theme.controlColorDisabled,

  ...evaluateStyle(props.userStyle, props)
}));

const CheckBoxIcon = styled.div(props => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',

  '&:before': {
    content:
      props.value === CHECKBOX_STATE.ON ? '"✓"' : props.value === CHECKBOX_STATE.OFF ? '""' : '"-"'
  },

  ...evaluateStyle(props.userStyle, props)
}));

// Input component that can hande three states: '✓' (on), ' ' (off), and '-' (indeterminate)
class CheckBox extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOf([CHECKBOX_STATE.OFF, CHECKBOX_STATE.INDETERMINATE, CHECKBOX_STATE.ON])
      .isRequired,
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
    value: CHECKBOX_STATE.OFF,
    label: '',
    style: {},
    isEnabled: true,
    onChange: () => {}
  };

  state = {
    isHovered: false
  };

  _onMouseEnter = () => this.setState({isHovered: true});

  _onMouseLeave = () => this.setState({isHovered: false});

  _onClick = event => {
    this.props.onChange(
      this.props.value === CHECKBOX_STATE.ON ? CHECKBOX_STATE.OFF : CHECKBOX_STATE.ON
    );
  };

  render() {
    const {value, style, className, theme, label, tooltip, badge, isEnabled} = this.props;
    const {size = theme.controlSize} = style;

    const styleProps = {
      theme,
      value,
      size,
      isHovered: this.state.isHovered,
      isEnabled
    };

    return (
      <CheckBoxComponent
        className={className}
        userStyle={style.wrapper}
        {...styleProps}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
      >
        <CheckBoxBorder userStyle={style.border} {...styleProps}>
          <CheckBoxIcon userStyle={style.icon} {...styleProps} />
        </CheckBoxBorder>
        <Label isEnabled={isEnabled} style={style.label} tooltip={tooltip} badge={badge}>
          {label}
        </Label>
      </CheckBoxComponent>
    );
  }
}

const ThemedCheckBox = withTheme(CheckBox);

Object.assign(ThemedCheckBox, CHECKBOX_STATE);

export default ThemedCheckBox;
