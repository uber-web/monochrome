import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from '../label';

const STYLES = {
  default: {
    pointerEvents: 'all'
  },
  disabled: {
    pointerEvents: 'none'
  },
  container: {
    position: 'relative'
  },
  arrow: {
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  }
};

// Select component that takes an array and accessors and populates a dropdown
export default class Dropdown extends PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
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
    isEnabled: true
  };

  _onChange = event => {
    const {onChange} = this.props;
    onChange(event.target.value);
  }

  render() {
    const {data, label, tooltip, value, size, isEnabled} = this.props;
    const className = classnames(
      {disabled: !isEnabled},
      this.props.className,
      'mc-dropdown'
    );

    const inputStyle = {
      boxSizing: 'border-box',
      width: '100%',
      height: size + 8,
      lineHeight: `${size + 8}px`
    };

    return (
      <div className={className} style={isEnabled ? STYLES.default : STYLES.disabled}>
        <Label tooltip={tooltip} >
          {label}
        </Label>

        <div className="mc-dropdown--container" style={STYLES.container}>
          <select style={inputStyle}
            onChange={this._onChange}
            value={value}>

            {Object.keys(data).map(key => (
              <option key={key} value={key}>
                {data[key]}
              </option>
            ))}

          </select>
          <div className="mc-dropdown--arrow" style={STYLES.arrow} />
        </div>
      </div>
    );
  }
}
