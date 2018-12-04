import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';
import {InfoIcon} from '../icons';

import {Tooltip} from '../popover';

const LabelComponent = styled.label(props => ({
  ...props.theme.__reset__,
  display: 'flex',
  alignItems: 'center',
  cursor: 'inherit',
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,

  '>*': {
    marginLeft: props.theme.spacingNormal
  },

  ...evaluateStyle(props.userStyle, props)
}));

const LabelInfo = styled.div(props => ({
  display: 'inline-block',
  color: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
  cursor: 'default',
  verticalAlign: 'middle',
  width: 16,
  height: 16,
  lineHeight: '16px',
  textAlign: 'center',
  path: {fill: 'currentColor'},

  ...evaluateStyle(props.userStyle, props)
}));

// Input component that can be toggled on and off
class Label extends PureComponent {
  static propTypes = {
    for: PropTypes.string,
    style: PropTypes.object,
    tooltip: PropTypes.string,
    badge: PropTypes.element,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    isEnabled: true
  };

  render() {
    const {theme, isEnabled, for: htmlFor, style, children, tooltip, badge} = this.props;
    const labelProps = {};

    if (htmlFor) {
      labelProps.htmlFor = htmlFor;
    }

    const styleProps = {
      theme,
      isEnabled
    };

    return (
      <LabelComponent {...styleProps} userStyle={style.label}>
        {children}
        {tooltip && (
          <Tooltip style={style.tooltip} content={tooltip}>
            <LabelInfo {...styleProps} userStyle={style.tooltipTarget}>
              {style.iconInfo || <InfoIcon />}
            </LabelInfo>
          </Tooltip>
        )}
        {badge}
      </LabelComponent>
    );
  }
}

export default withTheme(Label);
