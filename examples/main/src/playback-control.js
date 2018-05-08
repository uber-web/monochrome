/* Playback control example */
/* global window */
import React, {Component} from 'react';
import {PlaybackControl, Dropdown, AutoSizer} from 'monochrome';

const PLAYBACK_SPEEDS = {
  '-1': 'Reverse',
  0.5: '0.5x Speed',
  1: 'Normal',
  2: '2x Speed'
};

const CLIP_LENGTH = 20;

const MARKERS = [
  {startTime: 0, endTime: 3, style: {background: '#ccc'}},
  {startTime: 3, endTime: 14, style: {background: '#0a9'}},
  {startTime: 14, endTime: 20, style: {background: '#fa0'}}
];

export default class PlaybackControlExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      isPlaying: false,
      currentTime: 0,
      speed: 1
    };

    this._timer = null;
  }

  _onResize = ({width}) => {
    this.setState({width});
  };

  // A simple timer that simulates video playback
  _onUpdateTimer(lastUpdateTimestamp) {
    window.cancelAnimationFrame(this._timer);

    const timestamp = Date.now();
    const {currentTime, speed} = this.state;

    // Update current time
    const timeElapsed = (timestamp - lastUpdateTimestamp) / 1000;
    // Loop around the clip
    const newTime = (timeElapsed * speed + currentTime + CLIP_LENGTH) % CLIP_LENGTH;
    this.setState({currentTime: newTime});

    this._timer = window.requestAnimationFrame(this._onUpdateTimer.bind(this, timestamp));
  }

  _onPlay = () => {
    this.setState({isPlaying: true});
    this._onUpdateTimer(Date.now());
  };

  _onPause = () => {
    this.setState({isPlaying: false});
    window.cancelAnimationFrame(this._timer);
  };

  _onSeek = currentTime => {
    this.setState({currentTime});
  };

  _updateSpeed = speed => {
    this.setState({speed: Number(speed)});
  };

  render() {
    const {isPlaying, currentTime, speed, width} = this.state;

    return (
      <div>
        <AutoSizer onResize={this._onResize} />

        <h3>Custom content</h3>
        <PlaybackControl
          width={width}
          currentTime={currentTime}
          startTime={0}
          endTime={CLIP_LENGTH}
          isPlaying={isPlaying}
          onPlay={this._onPlay}
          onPause={this._onPause}
          onSeek={this._onSeek}
        >
          <Dropdown
            key="speed-selector"
            className="speed-selector"
            data={PLAYBACK_SPEEDS}
            value={String(speed)}
            onChange={this._updateSpeed}
          />
        </PlaybackControl>

        <h3>Markers</h3>
        <PlaybackControl
          className="dark"
          width={width}
          currentTime={currentTime}
          startTime={0}
          endTime={CLIP_LENGTH}
          isPlaying={isPlaying}
          markers={MARKERS}
          onPlay={this._onPlay}
          onPause={this._onPause}
          onSeek={this._onSeek}
        />
      </div>
    );
  }
}
