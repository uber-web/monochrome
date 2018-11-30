import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

import {Tooltip} from '../popover';

const LabelComponent = styled.label(props => ({
  cursor: 'inherit',
  ...evaluateStyle(props.userStyle, props)
}));

const LabelInfo = styled.div(props => ({
  display: 'inline-block',
  marginLeft: props.theme.spacingNormal,
  marginRight: props.theme.spacingNormal,
  background: props.theme.controlColorPrimary,
  color: props.theme.textColorInvert,
  cursor: 'default',
  borderRadius: '50%',
  fontSize: '10px',
  lineHeight: '12px',
  width: '12px',
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
    badge: PropTypes.element
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const {theme, for: htmlFor, style, children, tooltip, badge} = this.props;
    const labelProps = {};

    if (htmlFor) {
      labelProps.htmlFor = htmlFor;
    }

    return (
      <LabelComponent theme={theme} userStyle={style.label}>
        {children}
        {tooltip && (<Tooltip style={style.tooltip} content={tooltip} >
          <LabelInfo theme={theme} userStyle={style.tooltipTarget} />
        </Tooltip>)}
        {badge}
      </LabelComponent>
    );
  }
}

export default withTheme(Label);
