import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {evaluateStyle} from '../theme';

const RadioItem = styled.div(props => ({
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
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
    marginLeft: props.theme.spacingSmall,

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
  width: 16,
  height: 16,
  textAlign: 'center',
  lineHeight: '16px',
  path: {fill: 'currentColor'},

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
        {label}

        <RadioButton {...styleProps} userStyle={style.button}>
          <RadioIcon {...styleProps} userStyle={style.icon}>
            {isSelected ? style.iconSelected || '●' : null}
          </RadioIcon>
        </RadioButton>
      </RadioItem>
    );
  }
}
