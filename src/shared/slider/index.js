import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Draggable from '../draggable';
import {clamp} from '../../utils/math';

function snap(x, min, max, step) {
  if (step > 0) {
    x = Math.round((x - min) / step) * step + min;
  }
  return clamp(x, min, max);
}

const STYLES = {
  default: {
    cursor: 'pointer',
    pointerEvents: 'all'
  },
  disabled: {
    pointerEvents: 'none'
  },
  track: {
    position: 'relative',
    width: '100%'
  }
};

/*
* @class
*/
export default class Slider extends PureComponent {

  static propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    step: PropTypes.number,
    size: PropTypes.number,
    tolerance: PropTypes.number,
    isEnabled: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    size: 18,
    tolerance: 10,
    step: 0,
    isEnabled: true
  }

  constructor(props) {
    super(props);
    this.state = {
      width: 1,
      isDragging: false,
      hasDragged: false
    };
  }

  _updateValue = (offsetX, width) => {
    const {min, max, step} = this.props;
    const pos = clamp(offsetX / width, 0, 1);
    const value = snap(min + (max - min) * pos, min, max, step);

    this.props.onChange(value);
  };

  _onDragStart = evt => {
    const width = this._track.clientWidth;
    this.setState({width});
    this._updateValue(evt.offsetX, width);
    this.setState({isDragging: true});
  };

  _onDrag = evt => {
    this._updateValue(evt.offsetX, this.state.width);
    this.setState({hasDragged: evt.hasDragged});
  };

  _onDragEnd = evt => {
    this.setState({isDragging: false, hasDragged: false});
  };

  render() {
    const {
      tolerance, size,
      value, min, max, step, isEnabled
    } = this.props;
    const {isDragging, hasDragged} = this.state;
    const className = classnames(
      {disabled: !isEnabled, active: isDragging},
      this.props.className,
      'mc-slider'
    );

    const ratio = (snap(value, min, max, step) - min) / (max - min);

    const eventCanvasStyle = {
      margin: `${-tolerance}px ${size / 2 - tolerance}px`,
      padding: tolerance
    };

    const fillStyle = {
      transitionProperty: 'width',
      transitionDuration: hasDragged ? '0s' : undefined,
      width: `${ratio * 100}%`,
      height: '100%'
    };

    const knobStyle = {
      boxSizing: 'border-box',
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      margin: -size / 2,
      left: `${ratio * 100}%`,
      top: '50%',
      transitionProperty: 'left',
      transitionDuration: hasDragged ? '0s' : undefined
    };

    return (
      <div className={className} style={isEnabled ? STYLES.default : STYLES.disabled}>
        <Draggable style={eventCanvasStyle}
          onStart={this._onDragStart}
          onDrag={this._onDrag}
          onEnd={this._onDragEnd} >
          <div className="mc-slider--track" style={STYLES.track}
            ref={ref => {
              this._track = ref;
            }} >
            <div className="mc-slider--track-fill" style={fillStyle} />
            <div className="mc-slider--knob" style={knobStyle} />
          </div>
        </Draggable>
      </div>
    );
  }

}
