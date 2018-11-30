import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

import {Tooltip} from '../popover';

const LabelComponent = styled.label(props => ({
  cursor: 'inherit',
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
  ...evaluateStyle(props.userStyle, props)
}));

const LabelInfo = styled.div(props => ({
  display: 'inline-block',
  marginLeft: props.theme.spacingNormal,
  marginRight: props.theme.spacingNormal,
  background: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
  color: props.theme.textColorInvert,
  cursor: 'default',
  borderRadius: '50%',
  fontSize: '0.8em',
  width: props.theme.fontSize,
  lineHeight: `${props.theme.fontSize}px`,
  textAlign: 'center',

  '&:before': {
    content: '"?"'
  },
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
            <LabelInfo {...styleProps} userStyle={style.tooltipTarget} />
          </Tooltip>
        )}
        {badge}
      </LabelComponent>
    );
  }
}

export default withTheme(Label);
