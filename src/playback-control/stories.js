/* Playback control example */
/* global window */
import React, {Component} from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import PlaybackControl from './index';
import {Dropdown} from '../shared';

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

const BUFFER_RANGE = [{startTime: 0, endTime: 15}];

class PlaybackControlExample extends Component {
  state = {
    isPlaying: false,
    currentTime: 0,
    speed: 1
  };

  _timer = null;

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
    const {compact = false, showSpeedOptions = false, showMarkers = false} = this.props;
    const {isPlaying, currentTime, speed} = this.state;

    return (
      <PlaybackControl
        compact={compact}
        currentTime={currentTime}
        startTime={0}
        endTime={CLIP_LENGTH}
        isPlaying={isPlaying}
        markers={showMarkers ? MARKERS : []}
        bufferRange={showMarkers ? BUFFER_RANGE : []}
        onPlay={this._onPlay}
        onPause={this._onPause}
        onSeek={this._onSeek}
      >
        {showSpeedOptions && <div style={{flexGrow: 1}} />}
        {showSpeedOptions && (
          <Dropdown
            key="speed-selector"
            className="speed-selector"
            data={PLAYBACK_SPEEDS}
            value={String(speed)}
            onChange={this._updateSpeed}
          />
        )}
      </PlaybackControl>
    );
  }
}

storiesOf('PlaybackControl', module)
  .addDecorator(withReadme(README))
  .add('Basic example', () => <PlaybackControlExample compact={boolean('compact', false)} />)
  .add('Markers', () => (
    <PlaybackControlExample showMarkers={true} compact={boolean('compact', false)} />
  ))
  .add('Custom controls', () => <PlaybackControlExample showSpeedOptions={true} />);
