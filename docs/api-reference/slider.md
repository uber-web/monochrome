# Slider

A stateless slider control component.

## Usage

    import {Slider} from 'monochrome';

    <Slider value={0.5} min={0} max={1} onChange={...} />

## API Reference

### Props

* `value` **(number)** - value of the slider.
* `onChange` **(function)** - callback when the value is changed by user action.
* `min` **(number)** - minimum value
* `max` **(number)** - maximum value
* `step` **(number, optional)** - step to snap the value to. Default is `0` (no snapping).
* `tolerance` **(number, optional)** - number of pixels around the slider that are also interactive. Default is `10`.
* `size` **(number, optional)** - size of the toggle. Default is `18`.
* `isEnabled` **(boolean, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.
* `label` **(string, optional)** - label for the control.
* `tooltip` **(string, optional)** - forwarded to the Label compoenent.


### CSS Classes

* `mc-slider--wrapper` - wrapper element around both the label and the slider.
* `mc-slider` - the container of the slider.
* `mc-slider--track` - the track element.
* `mc-slider--track-fill` - the part of the track left to the knob.
* `mc-slider--track-knob` - the knob element.
