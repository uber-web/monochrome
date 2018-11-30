# CheckBox

A stateless, 3-state check box control component.

## Usage

    import {CheckBox} from 'monochrome';

    <CheckBox label="Include package" value={CheckBox.ON} onChange={...} />

## API Reference

### Props

* `value` **(enum)** - value of the check box. See constants below.
* `onChange` **(function)** - callback when the value is changed by user action.
* `isEnabled` **(boolean, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.
* `label` **(string, optional)** - label for the control.
* `tooltip` **(string, optional)** - forwarded to the Label compoenent.
* `style` **(object, optional)** - custom style. See "styling" section below.

### Constants

Values:

* `CheckBox.ON`
* `CheckBox.OFF`
* `CheckBox.INDETERMINATE`

### Styling

The `style` prop expects an object that may contain the following keys:

* `wrapper` - wrapper element around both the label and the checkbox.
* `border` - the border around the checkbox.
* `icon` - the icon in the checkbox.
* `size` **(number)** - size of the check box. Default is `18`.
* `label` - the label. This value will be passed to the [Label](/docs/api-reference/label.md) component.

The values define the styling overrides for the respective child components. Unless noted otherwise, each value is an object, or a callback function.

```jsx
const checkboxStyle = {
  border: {
    width: 20,
    height: 20
  },
  icon: props => ({
    '&:before': {
      content: props.value === CheckBox.ON ? '"Y"' : '"N"'
    }
  })
};
```

A custom style callback function will receive the following arguments:

* `props` **(object)**
  - `theme` **(object)** - the current theme
  - `value` **(enum)** - the current value of the checkbox
  - `size` **(number)** - the size of the checkbox
  - `isEnabled` **(boolean)** - if the control is enabled
  - `isHovered` **(boolean)** - if the pointer is hovering over the control
