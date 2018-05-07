import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from '../popover';

const STYLES = {
  label: {
    cursor: 'inherit'
  },
  info: {
    cursor: 'default',
    borderRadius: '50%',
    fontSize: '10px',
    lineHeight: '12px',
    width: '12px',
    textAlign: 'center'
  }
};

// Input component that can be toggled on and off
export default class Label extends PureComponent {

  static propTypes = {
    for: PropTypes.string,
    tooltip: PropTypes.string
  };

  _renderTooltip() {
    const {tooltip} = this.props;

    if (!tooltip) {
      return null;
    }

    return (<Tooltip content={tooltip} >
      <span className="mc-label--info" style={STYLES.info} >?</span>
    </Tooltip>);
  }

  render() {
    const {for: htmlFor, children} = this.props;
    const labelProps = {};

    if (htmlFor) {
      labelProps.htmlFor = htmlFor;
    }

    return (
      <label className="mc-label" style={STYLES.label} {...labelProps}>
        {children}
        {this._renderTooltip()}
      </label>
    );
  }
}
