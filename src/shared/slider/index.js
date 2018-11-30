import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

import Label from '../label';
import Draggable from '../draggable';
import {clamp} from '../../utils/math';

function snap(x, min, max, step) {
  if (step > 0) {
    x = Math.round((x - min) / step) * step + min;
  }
  return clamp(x, min, max);
}

const SliderComponent = styled.div(props => ({
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  paddingTop: props.knobSize / 2,
  paddingBottom: props.knobSize / 2,
  ...evaluateStyle(props.userStyle, props)
}));

const SliderWrapper = styled.div(props => ({
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
  ...evaluateStyle(props.userStyle, props)
}));

const SliderTrack = styled.div(props => ({
  position: 'relative',
  width: '100%',
  background: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
  height: 2,
  ...evaluateStyle(props.userStyle, props)
}));

const SliderTrackFill = styled.div(props => ({
  position: 'absolute',
  transitionProperty: 'width',
  transitionDuration: props.isDragging ? '0s' : props.theme.transitionDuration,
  transitionTimingFunction: props.theme.transitionTimingFunction,
  width: `${props.filled * 100}%`,
  height: '100%',
  background: props.isEnabled ? props.theme.controlColorActive : props.theme.controlColorDisabled,
  ...evaluateStyle(props.userStyle, props)
}));

const SliderKnob = styled.div(props => ({
  position: 'absolute',
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: props.isEnabled
    ? props.isActive
      ? props.theme.controlColorActive
      : props.isHovered
      ? props.theme.controlColorHovered
      : props.theme.controlColorPrimary
    : props.theme.controlColorDisabled,
  background: props.theme.background,
  boxSizing: 'border-box',
  width: props.knobSize,
  height: props.knobSize,
  borderRadius: '50%',
  margin: -props.knobSize / 2,
  left: `${props.filled * 100}%`,
  top: '50%',
  transitionProperty: 'left',
  transitionDuration: props.isDragging ? '0s' : props.theme.transitionDuration,

  ...evaluateStyle(props.userStyle, props)
}));

/*
 * @class
 */
class Slider extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    step: PropTypes.number,
    label: PropTypes.string,
    tooltip: PropTypes.string,
    badge: PropTypes.element,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    style: {},
    step: 0,
    isEnabled: true,
    onChange: () => {}
  };

  state = {
    width: 1,
    isHovered: false,
    isDragging: false,
    hasDragged: false
  };

  _updateValue = (offsetX, width) => {
    const {min, max, step} = this.props;
    const pos = clamp(offsetX / width, 0, 1);
    const value = snap(min + (max - min) * pos, min, max, step);

    this.props.onChange(value);
  };

  _onMouseEnter = () => this.setState({isHovered: true});

  _onMouseLeave = () => this.setState({isHovered: false});

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
      label,
      tooltip,
      badge,
      value,
      min,
      max,
      step,
      isEnabled,
      children,
      className,
      style,
      theme
    } = this.props;
    const {isHovered, isDragging, hasDragged} = this.state;

    const {tolerance = 0, knobSize = theme.controlSize} = style;
    const ratio = (snap(value, min, max, step) - min) / (max - min);

    const styleProps = {
      theme,
      knobSize,
      isEnabled,
      isHovered,
      isActive: isDragging,
      isDragging: hasDragged,
      filled: ratio
    };
    return (
      <SliderWrapper {...styleProps} userStyle={style.wrapper} className={className}>
        {label && (
          <Label isEnabled={isEnabled} style={style.label} tooltip={tooltip} badge={badge}>
            {label}
          </Label>
        )}

        <SliderComponent
          {...styleProps}
          userStyle={style.slider}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
        >
          <Draggable
            tolerance={knobSize / 2 + tolerance}
            onStart={this._onDragStart}
            onDrag={this._onDrag}
            onEnd={this._onDragEnd}
          >
            <SliderTrack
              userStyle={style.track}
              {...styleProps}
              ref={ref => {
                this._track = ref;
              }}
            >
              {children}
              <SliderTrackFill {...styleProps} userStyle={style.trackFill} />
              <SliderKnob {...styleProps} userStyle={style.knob} />
            </SliderTrack>
          </Draggable>
        </SliderComponent>
      </SliderWrapper>
    );
  }
}

export default withTheme(Slider);
