# Toggle

A stateless toggle control component.

## Usage

    import {Toggle} from 'monochrome';

    <Toggle label="Do not disturb" value={true} onChange={...} />

## API Reference

### Props

* `value` **(boolean)** - value of the toggle.
* `onChange` **(function)** - callback when the value is changed by user action.
* `size` **(number, optional)** - size of the toggle. Default is `18`.
* `isEnabled` **(boolean, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.
* `label` **(string, optional)** - label for the control.
* `tooltip` **(string, optional)** - forwarded to the Label compoenent.
* `style` **(string, optional)** - custom style. See "styling" section below.


### Styling

The `style` prop expects an object that may contain the following keys:

* `wrapper` - wrapper element around both the label and the toggle.
* `toggle` - the container of the toggle.
* `track` - the track element of the toggle.
* `knob` - the knob element of the toggle.
* `knobSize` **(number)** - size of the knob. Default is `18`.
* `label` - the label. This value will be passed to the [Label](/docs/api-reference/label.md) component.

The values define the styling overrides for the respective child components. Unless noted otherwise, each value is an object, or a callback function.

```jsx
const toggleStyle = {
  knobSize: 24,
  track: {
    height: 4
  }
};
```

A custom style callback function will receive the following arguments:

* `props` **(object)**
  - `theme` **(object)** - the current theme
  - `value` **(boolean)** - the current value of the toggle
  - `knobSize` **(number)** - the size of the knob
  - `isEnabled` **(boolean)** - if the control is enabled
  - `isHovered` **(boolean)** - if the pointer is hovering over the control
