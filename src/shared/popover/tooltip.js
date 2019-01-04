/**
 * Tooltip is just a Popover with some style overrides
 */
import React from 'react';

import {evaluateStyle} from '../theme';

import Popover from './popover';

class Tooltip extends React.Component {
  static propTypes = Popover.propTypes;

  static defaultProps = {
    style: {},
    position: Popover.AUTO
  };

  render() {
    const {style} = this.props;
    const tooltipStyle = {
      ...style,
      body: props => ({
        maxWidth: 300,
        paddingTop: props.theme.spacingSmall,
        paddingBottom: props.theme.spacingSmall,
        paddingLeft: props.theme.spacingNormal,
        paddingRight: props.theme.spacingNormal,
        ...evaluateStyle(style.body, props)
      })
    };

    return <Popover {...this.props} style={tooltipStyle} trigger={Popover.HOVER} />;
  }
}

export default Tooltip;
