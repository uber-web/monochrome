import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AutoSizer from '../shared/autosizer';
import Slider from '../shared/slider';
import {getTimelineTicks, formatTimeCode} from './utils';
import {scaleLinear} from 'd3-scale';

function noop() {}

const STYLES = {
  controlsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  markerContainer: {
    position: 'relative'
  },
  button: {
    cursor: 'pointer'
  },
  ticksContainer: {
    position: 'relative'
  },
  buffer: {
    height: '100%'
  }
};

function normalizePadding(padding) {
  padding = padding || 0;
  if (Number.isFinite(padding)) {
    return {top: padding, right: padding, bottom: padding, left: padding};
  }
  return Object.assign(
    {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    padding
  );
}

/*
 * @class
 */
export default class PlaybackControl extends PureComponent {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    currentTime: PropTypes.number.isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    className: PropTypes.string,

    // config
    step: PropTypes.number,
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    tickSpacing: PropTypes.number,
    bufferRange: PropTypes.arrayOf(PropTypes.object),
    markers: PropTypes.arrayOf(PropTypes.object),

    // callbacks
    formatTick: PropTypes.func,
    formatTimestamp: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onSeek: PropTypes.func
  };

  static defaultProps = {
    width: '100%',
    className: '',
    startTime: 0,
    step: 0.1,
    padding: 24,
    tickSpacing: 100,
    formatTick: x => formatTimeCode(x, '{mm}:{ss}'),
    formatTimestamp: x => formatTimeCode(x, '{mm}:{ss}.{S}'),
    onPlay: noop,
    onPause: noop,
    onSeek: noop
  };

  static formatTimeCode = formatTimeCode;

  constructor(props) {
    super(props);
    this.scale = scaleLinear().domain([props.startTime, props.endTime]);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const props = this.props;

    if (
      newProps.step !== props.step ||
      newProps.startTime !== props.startTime ||
      newProps.endTime !== props.endTime
    ) {
      // Video source has changed
      // Kill any running animation to avoid callbacks in incorrect time range
      this._pause();
      // Update currentTime to make sure it is the start of the new range
      this._seek(newProps.startTime);
      this.scale.domain([newProps.startTime, newProps.endTime]);
    }
  }

  componentWillUnmount() {
    this._pause();
  }

  _play = () => {
    this.props.onPlay();
  };

  _pause = () => {
    this.props.onPause();
  };

  _seek = newTime => {
    const {currentTime} = this.props;

    if (newTime !== currentTime) {
      this.props.onSeek(newTime);
    }
  };

  _onResize = ({width}) => {
    const padding = normalizePadding(this.props.padding);
    this.scale.range([0, width - padding.left - padding.right]);
    // Trigger rerender
    this.setState({width});
  };

  _renderMarker(marker, i, className, extraStyle) {
    const {scale} = this;
    const {startTime = marker.time, endTime = marker.time, style, content} = marker;
    const x0 = scale(startTime);
    const x1 = scale(endTime);

    const markerStyle = {
      ...extraStyle,
      ...style,
      position: 'absolute',
      left: x0,
      width: x1 - x0
    };
    return (
      <div key={i} className={className} style={markerStyle}>
        {content}
      </div>
    );
  }

  _renderTimeline() {
    const {tickSpacing, formatTick, markers} = this.props;
    const {scale} = this;
    const ticks = getTimelineTicks(scale, tickSpacing, formatTick);

    return (
      <div>
        <div className="mc-playback-control--ticks" style={STYLES.ticksContainer}>
          {ticks.map((t, i) => {
            const tickStyle = {
              position: 'absolute',
              left: t.x
            };
            return (
              <div key={i} className="mc-playback-control--tick" style={tickStyle}>
                <div className="mc-playback-control--tick-label">{t.label}</div>
              </div>
            );
          })}
        </div>

        {markers && (
          <div style={STYLES.markerContainer}>
            {markers.map((marker, i) =>
              this._renderMarker(marker, i, 'mc-playback-control--marker')
            )}
          </div>
        )}
      </div>
    );
  }

  _renderSlider() {
    const {currentTime, startTime, endTime, step, bufferRange = []} = this.props;

    const buffers = Array.isArray(bufferRange) ? bufferRange : [bufferRange];

    return (
      <Slider
        className="mc-playback-control--slider"
        value={currentTime}
        onChange={this._seek}
        knobSize={18}
        step={step}
        min={startTime}
        max={endTime}
      >
        {buffers.map((range, i) =>
          this._renderMarker(range, i, 'mc-playback-control--buffer', STYLES.buffer)
        )}
      </Slider>
    );
  }

  _renderControls() {
    const {isPlaying, currentTime, formatTimestamp, children} = this.props;

    return [
      // Play/pause button
      <div
        key="play-pause-button"
        style={STYLES.button}
        className="mc-playback-control--play-pause-button"
        onClick={isPlaying ? this._pause : this._play}
      />,
      // Current time
      <span key="timestamp" className="mc-playback-control--timestamp">
        {formatTimestamp(currentTime)}
      </span>,
      children && React.Children.map(children, child => <div style={STYLES.control}>{child}</div>)
    ];
  }

  render() {
    const {width, isPlaying} = this.props;
    const padding = normalizePadding(this.props.padding);
    const className = classnames({playing: isPlaying}, this.props.className, 'mc-playback-control');

    const wrapperStyle = {
      boxSizing: 'border-box',
      width,
      paddingTop: padding.top,
      paddingBottom: padding.bottom,
      paddingLeft: padding.left,
      paddingRight: padding.right
    };

    return (
      <div className={className} style={wrapperStyle}>
        <AutoSizer disableHeight={true} onResize={this._onResize} />
        {this._renderTimeline()}
        {this._renderSlider()}

        <div style={STYLES.controlsContainer}>{this._renderControls()}</div>
      </div>
    );
  }
}
