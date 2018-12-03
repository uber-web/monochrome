# PlaybackControl

A stateless video playback control component.

**Features**

* Play / Pause
* Seeking
* Responsive labels
* Markers


## Usage

    import {PlaybackControl} from 'monochrome';

    <PlaybackControl currentTime={8.3} endTime={20} isPlaying={false} onPlay={...} onSeek={...} />


## API Reference

### Static Methods

* `PlaybackControl.formatTimeCode` - 
  + `value` **(number)** - time in seconds
  + `format` **(string)** - format code, default `{hh}:{mm}:{ss}.{SSS}`.
    - `h` - hours
    - `m` - minutes
    - `s` - seconds
    - `S` - decimal seconds

### Props

* `style` **(object, optional)** - custom CSS overrides. See "Styling" section below.
* `layout` **(enum, optional)** - Layout mode of the control. See constants:layouts below. Defaults to `PlaybackControl.NORMAL`.
* `currentTime` **(number)** -  current time in seconds
* `startTime` **(number, optional)** -  start time in seconds, default `0`
* `endTime` **(number)** -  end time in seconds
* `isPlaying` **(boolean)** -  whether the video is playing
* `step` **(number, optional)** -  scrub interval in seconds
* `tickSpacing` **(number, optional)** -  spacing between ticks in pixels, default `100`.
* `formatTick` **(function, optional)** -  format of ticks. Default `t => formatTimeCode(t, '{mm}:{ss}')`.
* `formatTimestamp` **(function, optional)** -  format of the current time label. Default `t => formatTimeCode(t, '{mm}:{ss}.{S}')`.
* `className` **(string, optional)** -  additional class name
* `bufferRange` **(array|object, optional)** -  one or multiple time ranges of loaded buffers to mark the track. Each item should contain the following fields:
  + `startTime` **(number)** starting timestamp of a time range
  + `endTime` **(number)** ending timestamp of a time range
* `markers` **(array, optional)** -  array of additional highlights to mark the timeline. Each marker should contain the following fields:
  + `time` or `startTime`, `endTime` **(number)** a single timestamp or a time range
  + `style` **(object, optional)** style of the marker
  + `content` **(element, optional)** content of the marker
* `onPlay` **(function, optional)** -  callback when user play.
* `onPause` **(function, optional)** -  callback when user pause.
* `onSeek` **(function, optional)** -  callback when user scrubs.


### Constants

Layouts:

* `PlaybackControl.COMPACT` - show play/pause button and timestamp at ends of the slider.
* `PlaybackControl.NORMAL` - show play/pause button and timestamp below the slider.

### Styling

The `style` prop expects an object that may contain the following keys:

* `width` **(string|number)** -  width of the control. Default `100%`.
* `padding` **(number|object)** -  padding at the sides of the slider in pixels. If provided as object, in the shape of `{left, right}`. Default `24`.
* `wrapper` - the top level container.
* `ticks` - the container of the ticks.
* `tick` - one of the ticks.
* `tickLabel` - the label of a tick.
* `markers` - the container of the markers.
* `marker` - one of the markers.
* `buffer` - one of the buffer indicators.
* `slider` **(object)** - the slider. The value will be passed to the [Slider](docs/api-reference/slider.md) component.
* `controls` - the container of the controls.
* `playPauseButton` - the play/pause button.
* `playIcon` **(element)**  - the play icon.
* `pauseIcon` **(element)**  - the pause icon.
* `timestamp` - the timestamp.

The values define the styling overrides for the respective child components. Unless noted otherwise, each value is an object, or a callback function.

A custom style callback function will receive the following arguments:

* `props` **(object)**
  - `theme` **(object)** - the current theme
  - `layout` **(enum)**
  - `isPlaying` **(boolean)**
