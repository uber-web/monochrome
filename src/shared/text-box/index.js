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
    position: 'relative',
  },
  clear: {
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  }
};

// Input component that can be toggled on and off
export default class TextBox extends PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string,
    tooltip: PropTypes.string,
    badge: PropTypes.element,
    size: PropTypes.number,
    showClearButton: PropTypes.bool,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    size: 18,
    showClearButton: true,
    isEnabled: true,
    onChange: () => {}
  };

  _focus = () => {
    if (this._input) {
      this._input.focus();
    }
  };

  _onChange = event => {
    this.props.onChange(event.target.value);
  };

  _onClear = event => {
    this.props.onChange('');
  };

  render() {
    const {value, label, tooltip, badge, size, showClearButton, isEnabled} = this.props;
    const className = classnames(
      {disabled: !isEnabled},
      this.props.className,
      'mc-textbox--wrapper'
    );

    const inputStyle = {
      boxSizing: 'border-box',
      width: '100%',
      height: size + 8,
      lineHeight: `${size + 8}px`
    };

    return (
      <div className={className} onClick={this._focus}
        style={isEnabled ? STYLES.default : STYLES.disabled}>
        {label && <Label tooltip={tooltip} badge={badge}>
          {label}
        </Label>}
        <div className="mc-textbox" style={STYLES.container}>
          <input
            ref={ref => {
              this._input = ref;
            }}
            className="mc-textbox--input"
            type="text"
            onChange={this._onChange}
            style={inputStyle}
            value={value} />
          {Boolean(value && showClearButton) &&
            <div className="mc-textbox--clear" onClick={this._onClear} style={STYLES.clear} />}
        </div>
      </div>
    );
  }
}
