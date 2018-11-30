import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

import Label from '../label';

function getControlColor(props) {
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    return props.theme.controlColorActive;
  } else if (props.isHovered) {
    return props.theme.controlColorHovered;
  }
  return props.theme.controlColorPrimary;
}

const WrapperComponent = styled.div(props => ({
  pointerEvents: props.isEnabled ? 'all' : 'none',
  ...evaluateStyle(props.userStyle, props)
}));

const DropdownBorder = styled.div(props => ({
  position: 'relative',
  height: props.height,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: getControlColor(props),
  ...evaluateStyle(props.userStyle, props)
}));

const DropdownInput = styled.select(props => ({
  cursor: 'pointer',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  lineHeight: `${props.height}px`,
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,

  appearance: 'none',
  background: props.theme.background,
  border: 'none',
  outline: 0,
  paddingLeft: props.theme.spacingSmall,
  paddingRight: props.theme.spacingLarge,

  ...evaluateStyle(props.userStyle, props)
}));

const DropdownIcon = styled.div(props => ({
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',

  color: getControlColor(props),
  padding: props.theme.spacingSmall,

  '&:before': {
    content: '"▾"'
  },
  ...evaluateStyle(props.userStyle, props)
}));

// Select component that takes an array and accessors and populates a dropdown
class Dropdown extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    tooltip: PropTypes.string,
    badge: PropTypes.element,
    style: PropTypes.object,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
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

  _onChange = event => {
    const {onChange} = this.props;
    onChange(event.target.value);
  };

  render() {
    const {theme, style, className, data, label, tooltip, badge, value, isEnabled} = this.props;
    const {height = theme.controlSize + 8} = style;

    const styleProps = {
      theme,
      height,
      hasFocus: this.state.hasFocus,
      isHovered: this.state.isHovered,
      isEnabled
    };

    return (
      <WrapperComponent className={className} userStyle={style.wrapper} {...styleProps}>
        {label && (
          <Label isEnabled={isEnabled} style={style.label} tooltip={tooltip} badge={badge}>
            {label}
          </Label>
        )}

        <DropdownBorder
          userStyle={style.border}
          {...styleProps}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
        >
          <DropdownInput
            userStyle={style.select}
            {...styleProps}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onChange={this._onChange}
            value={value}
          >
            {Object.keys(data).map(key => (
              <option key={key} value={key}>
                {data[key]}
              </option>
            ))}
          </DropdownInput>
          <DropdownIcon userStyle={style.icon} {...styleProps} />
        </DropdownBorder>
      </WrapperComponent>
    );
  }
}

export default withTheme(Dropdown);
