/**
 * This component detects resize of divs using
 * react-virtualized's AutoSizer
 * with some enhancements
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import debounce from 'debounce';

const noop = () => null;

export default class SizeSensor extends Component {
  static propTypes = {
    debounceTime: PropTypes.number
  };

  _onResize = size => {
    if (this.resize) {
      this.resize(size);
    } else if (this.props.onResize) {
      const {onResize, debounceTime} = this.props;
      // invoke callback immediately the first time
      onResize(size);
      // set up debounce for subsequent resize events
      this.resize = debounceTime > 0 ? debounce(onResize, debounceTime) : onResize;
    }
  };

  render() {
    return <AutoSizer onResize={this._onResize}>{this.props.children || noop}</AutoSizer>;
  }
}
