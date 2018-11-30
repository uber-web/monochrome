import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {evaluateStyle} from '../theme';

import Label from '../label';

const STYLE_STRETCHER = {flexGrow: 1};

const RadioItem = styled.div(props => ({
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  display: 'flex',
  alignItems: 'center',
  marginTop: props.theme.spacingTiny,
  marginBottom: props.theme.spacingTiny,
  ...evaluateStyle(props.userStyle, props)
}));

const RadioButton = styled.div(props => {
  let color = props.theme.controlColorPrimary;

  if (!props.isEnabled) {
    color = props.theme.controlColorDisabled;
  } else if (props.isSelected) {
    color = props.theme.controlColorActive;
  } else if (props.isHovered) {
    color = props.theme.controlColorHovered;
  }

  return {
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '50%',
    width: props.size,
    height: props.size,

    background: props.theme.background,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: color,
    color,
    flexShrink: 0,

    ...evaluateStyle(props.userStyle, props)
  };
});

const RadioIcon = styled.div(props => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',

  '&:before': {
    content: props.isSelected ? '"●"' : '""'
  },

  ...evaluateStyle(props.userStyle, props)
}));

// Select component that takes an array and accessors and populates a
// radio inputs group
export default class RadioBoxItem extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    style: PropTypes.object,
    isEnabled: PropTypes.bool,
    isSelected: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    isEnabled: true,
    onClick: () => {}
  };

  state = {
    isHovered: false
  };

  _onMouseEnter = () => this.setState({isHovered: true});

  _onMouseLeave = () => this.setState({isHovered: false});

  render() {
    const {theme, style, size, isSelected, label, isEnabled} = this.props;

    const styleProps = {
      theme,
      size,
      isSelected,
      isHovered: this.state.isHovered,
      isEnabled
    };

    return (
      <RadioItem
        {...styleProps}
        userStyle={style.item}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this.props.onClick}
      >
        <Label isEnabled={isEnabled} style={style.label}>
          {label}
        </Label>
        <div style={STYLE_STRETCHER} />
        <RadioButton {...styleProps} userStyle={style.button}>
          <RadioIcon {...styleProps} userStyle={style.icon} />
        </RadioButton>
      </RadioItem>
    );
  }
}
