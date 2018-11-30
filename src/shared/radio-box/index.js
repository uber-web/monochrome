import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

import RadioBoxItem from './radio-box-item';
import Label from '../label';

const WrapperComponent = styled.div(props => ({
  ...evaluateStyle(props.userStyle, props)
}));

// Select component that takes an array and accessors and populates a
// radio inputs group
class RadioBox extends PureComponent {
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

  _onClick = value => {
    this.props.onChange(value);
  };

  render() {
    const {theme, className, style, data, value, label, tooltip, badge, isEnabled} = this.props;

    const {size = theme.controlSize} = style;

    const styleProps = {
      theme,
      size,
      value,
      isEnabled
    };

    return (
      <WrapperComponent className={className} {...styleProps} userStyle={style.wrapper}>
        {label && (
          <Label isEnabled={isEnabled} style={style.label} tooltip={tooltip} badge={badge}>
            {label}
          </Label>
        )}

        {Object.keys(data).map(key => (
          <RadioBoxItem
            key={key}
            label={data[key]}
            theme={theme}
            size={size}
            style={style}
            isSelected={key === value}
            isEnabled={isEnabled}
            onClick={() => this._onClick(key)}
          />
        ))}
      </WrapperComponent>
    );
  }
}

export default withTheme(RadioBox);
