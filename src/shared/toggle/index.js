import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from '../label';

const STYLES = {
  default: {
    cursor: 'pointer',
    pointerEvents: 'all'
  },
  disabled: {
    pointerEvents: 'none'
  },
  track: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)'
  }
};

// Input component that can be toggled on and off
export default class Toggle extends PureComponent {

  static propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    tooltip: PropTypes.string,
    size: PropTypes.number,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    value: true,
    size: 18,
    isEnabled: true
  };

  _onClick = () => {
    this.props.onChange(!this.props.value);
  };

  _onChange = event => {
    this.props.onChange(event.target.checked);
  };

  render() {
    const {value, size, label, tooltip, isEnabled} = this.props;
    const {id} = this;
    const className = classnames(
      {disabled: !isEnabled},
      this.props.className,
      value ? 'on' : 'off',
      'mc-toggle'
    );

    const containerStyle = {
      position: 'relative',
      height: size
    };

    const knobStyle = {
      boxSizing: 'border-box',
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      left: value ? `calc(100% - ${size}px)` : 0,
      transitionProperty: 'left'
    };

    return (
      <div className={className} onClick={this._onClick}
        style={isEnabled ? STYLES.default : STYLES.disabled}>
        <Label tooltip={tooltip} >
          {label}
        </Label>
        <div className="mc-toggle--container" style={containerStyle}>
          <div className="mc-toggle--track" style={STYLES.track} />
          <div className="mc-toggle--knob" style={knobStyle} />
        </div>
      </div>
    );
  }
}
