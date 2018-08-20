# PlaybackControl

A stateless video playback control component.

**Features**

* Play / Pause
* Seeking
* Responsive labels
* Markers


## Usage

    import {PlaybackControl} from 'monochrome';

    <PlaybackControl width={200} currentTime={8.3} endTime={20} isPlaying={false} onPlay={...} onSeek={...} />


## API Reference

### Static Methods

* `formatTimeCode` - 
  + `value` **(number)** - time in seconds
  + `format` **(string)** - format code, default `{hh}:{mm}:{ss}.{SSS}`.
    - `h` - hours
    - `m` - minutes
    - `s` - seconds
    - `S` - decimal seconds

### Props

* `width` **(string|number, optional)** -  width of the control. Default `100%`.
* `padding` **(number, optional)** -  padding at the sides in pixels, default `24`.
* `currentTime` **(number)** -  current time in seconds
* `startTime` **(number, optional)** -  start time in seconds, default `0`
* `endTime` **(number)** -  end time in seconds
* `isPlaying` **(boolean)** -  whether the video is playing
* `step` **(number, optional)** -  scrub interval in seconds
* `tickSpacing` **(number, optional)** -  spacing between ticks in pixels, default `100`.
* `formatTick` **(function, optional)** -  format of ticks. Default `t => formatTimeCode(t, '{mm}:{ss}')`.
* `formatTimestamp` **(function, optional)** -  format of the current time label. Default `t => formatTimeCode(t, '{mm}:{ss}.{S}')`.
* `className` **(string, optional)** -  additional class name
* `markers` **(array, optional)** -  array of highlights to mark the timeline. Each marker should contain the following fields:
  + `time` or `startTime`, `endTime` **(number)** a single timestamp or a time range
  + `style` **(object, optional)** style of the marker
  + `content` **(element, optional)** content of the marker
* `onPlay` **(function, optional)** -  callback when user play.
* `onPause` **(function, optional)** -  callback when user pause.
* `onSeek` **(function, optional)** -  callback when user scrubs.

### CSS Classes

* `mc-playback-control` - wrapper around the whole control
* `mc-playback-control--ticks` - container of timeline ticks
* `mc-playback-control--tick` - a tick element
* `mc-playback-control--tick-label` - the label of a tick
* `mc-playback-control--marker` - a marker element
* `mc-playback-control--slider` - the time slider
* `mc-playback-control--play-pause-button` - the play pause button
* `mc-playback-control--timestamp` - the current time
