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
  content: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)'
  }
};

// Select component that takes an array and accessors and populates a
// radio inputs group
export default class RadioBox extends PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    size: 18,
    isEnabled: true,
    onChange: () => {}
  };

  _onClick = value => {
    this.props.onChange(value);
  }

  render() {
    const {data, value, size, isEnabled} = this.props;
    const className = classnames(
      {disabled: !isEnabled},
      this.props.className,
      'mc-radio-box'
    );

    const buttonStyle = {
      position: 'relative',
      boxSizing: 'border-box',
      borderRadius: '50%',
      width: size,
      height: size
    };

    return (
      <div className={className}>
        {Object.keys(data).map(key => {
          const label = data[key];
          const itemClassName = classnames('mc-radio-box--item', {
            selected: key === value
          });
          return (
            <div key={key} className={itemClassName}
              style={isEnabled ? STYLES.default : STYLES.disabled}
              onClick={() => this._onClick(key)}>
              <Label>{label}</Label>
              <div className="mc-radio-box--button" style={buttonStyle} >
                <div className="mc-radio-box--icon" style={STYLES.content} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
