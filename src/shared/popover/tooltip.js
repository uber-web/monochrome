/**
 * Tooltip is just a Popover with some style overrides
 */
import React from 'react';
import PropTypes from 'prop-types';
import Popover from './popover';

class Tooltip extends React.Component {

  static propTypes = Popover.propTypes;

  static defaultProps = {
    className: 'tooltip',
    position: Popover.TOP
  };

  render() {
    return <Popover {...this.props} trigger={Popover.HOVER} />;
  }
}

export default Tooltip;
