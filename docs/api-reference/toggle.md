# Toggle

A stateless toggle control component.

## Usage

    import {Toggle} from 'monochrome';

    <Toggle label="Do not disturb" value={true} onChange={...} />

## API Reference

### Props

* `value` **(bool)** - value of the toggle.
* `onChange` **(function)** - callback when the value is changed by user action.
* `size` **(number, optional)** - size of the toggle. Default is `18`.
* `isEnabled` **(bool, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.
* `label` **(string, optional)** - label for the control.
* `tooltip` **(string, optional)** - forwarded to the Label compoenent.


### CSS Classes

* `mc-toggle` - wrapper element around both the label and the toggle.
* `mc-toggle--container` - wrapper element around the toggle.
* `mc-toggle--track` - the track element of the toggle.
* `mc-toggle--knob` - the knob element of the toggle.
