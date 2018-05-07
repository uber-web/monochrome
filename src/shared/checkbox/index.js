import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from '../label';

const CHECKBOX_STATE = {
  OFF: 'off',
  INDETERMINATE: 'indeterminate',
  ON: 'on'
};

const STYLES = {
  default: {
    cursor: 'pointer',
    pointerEvents: 'all'
  },
  disabled: {
    pointerEvents: 'none'
  },
  icon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)'
  }
};

// Input component that can hande three states: '✓' (on), ' ' (off), and '-' (indeterminate) 
export default class CheckBox extends PureComponent {

  static propTypes = {
    value: PropTypes.oneOf([CHECKBOX_STATE.OFF, CHECKBOX_STATE.INDETERMINATE, CHECKBOX_STATE.ON]).isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string,
    tooltip: PropTypes.string,
    size: PropTypes.number,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    label: '',
    size: 18,
    isEnabled: true,
    onChange: () => {}
  };

  _onClick = event => {
    this.props.onChange(this.props.value === CHECKBOX_STATE.ON ? CHECKBOX_STATE.OFF : CHECKBOX_STATE.ON);
  }

  render() {
    const {value, label, tooltip, size, isEnabled} = this.props;

    const className = classnames(
      this.props.className,
      (isEnabled ? '' : 'disabled'),
      'mc-checkbox',
      value.toString()
    );

    const borderStyle = {
      display: 'inline-block',
      position: 'relative',
      width: size,
      height: size
    };

    return (
      <div className={className}
        onClick={this._onClick}
        style={isEnabled ? STYLES.default : STYLES.disabled} >
        <div className="mc-checkbox--border" style={borderStyle}>
          <div className="mc-checkbox--icon" style={STYLES.icon} />
        </div>
        <Label tooltip={tooltip} >
          {label}
        </Label>
      </div>
    );
  }
}

Object.assign(CheckBox, CHECKBOX_STATE);
