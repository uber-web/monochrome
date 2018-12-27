import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';
import {CheckIcon, IndeterminateIcon} from '../icons';

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
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,

  ...evaluateStyle(props.userStyle, props)
}));

const CheckBoxBorder = styled.div(props => {
  let color = props.theme.controlColorPrimary;

  if (!props.isEnabled) {
    color = props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    color = props.theme.controlColorActive;
  } else if (props.isHovered) {
    color = props.theme.controlColorHovered;
  }

  return {
    outline: 'none',
    display: 'inline-block',
    position: 'relative',
    width: props.size,
    height: props.size,

    flexGrow: 0,
    flexShrink: 0,
    marginRight: props.theme.spacingSmall,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: color,
    color,

    ...evaluateStyle(props.userStyle, props)
  };
});

const CheckBoxIcon = styled.div(props => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  width: 16,
  height: 16,
  textAlign: 'center',
  lineHeight: '16px',
  path: {fill: 'currentColor'},

  ...evaluateStyle(props.userStyle, props)
}));

// Input component that can hande three states: '✓' (on), ' ' (off), and '-' (indeterminate)
class CheckBox extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOf([CHECKBOX_STATE.OFF, CHECKBOX_STATE.INDETERMINATE, CHECKBOX_STATE.ON])
      .isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.node,
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
      this._onClick(evt);
    }
  };

  _onClick = event => {
    this.props.onChange(
      this.props.value === CHECKBOX_STATE.ON ? CHECKBOX_STATE.OFF : CHECKBOX_STATE.ON
    );
  };

  render() {
    const {value, style, className, theme, label, isEnabled} = this.props;
    const {size = theme.controlSize} = style;

    const styleProps = {
      theme,
      value,
      size,
      hasFocus: this.state.hasFocus,
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
        <CheckBoxBorder
          userStyle={style.border}
          {...styleProps}
          tabIndex={isEnabled ? 0 : -1}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onKeyDown={this._onKeyDown}
        >
          <CheckBoxIcon userStyle={style.icon} {...styleProps}>
            {value === CHECKBOX_STATE.ON && (style.iconOn || <CheckIcon />)}
            {value === CHECKBOX_STATE.OFF && style.iconOff}
            {value === CHECKBOX_STATE.INDETERMINATE &&
              (style.iconIndeterminate || <IndeterminateIcon />)}
          </CheckBoxIcon>
        </CheckBoxBorder>
        {label}
      </CheckBoxComponent>
    );
  }
}

const ThemedCheckBox = withTheme(CheckBox);

Object.assign(ThemedCheckBox, CHECKBOX_STATE);

export default ThemedCheckBox;
