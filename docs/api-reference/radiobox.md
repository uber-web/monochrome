# RadioBox

A stateless radio box control component.

## Usage

    import {RadioBox} from 'monochrome';

    <RadioBox label="Pet" value="cat" data={{
      cat: 'Cat',
      dog: 'Dog',
    }} onChange={...} />

## API Reference

### Props


* `value` **(string)** - value of the radio box.
* `onChange` **(function)** - callback when the value is changed by user action.
* `data` **(object)** - value to label mapping.
* `size` **(number, optional)** - size of the toggle. Default is `18`.
* `isEnabled` **(boolean, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.
* `label` **(string, optional)** - label for the control.
* `tooltip` **(string, optional)** - forwarded to the Label compoenent.
* `style` **(object, optional)** - custom style. See "styling" section below.


### Styling

The `style` prop expects an object that may contain the following keys:

* `wrapper` - wrapper element around all radio controls.
* `item` - wrapper element around each label and radio button.
* `button` - the border element of the radio button.
* `icon` - the icon element of the radio bottom.
* `size` **(number)** - size of the check box. Default is `18`.
* `label` - the label. This value will be passed to the [Label](/docs/api-reference/label.md) component.

The values define the styling overrides for the respective child components. Unless noted otherwise, each value is an object, or a callback function.

```jsx
const radioStyle = {
  button: {
    width: 20,
    height: 20
  },
  icon: props => ({
    '&:before': {
      content: props.isSelected ? '"x"' : '""'
    }
  })
};
```

A custom style callback function will receive the following arguments:

* `props` **(object)**
  - `theme` **(object)** - the current theme
  - `size` **(number)** - the size of the checkbox
  - `isEnabled` **(boolean)** - if the control is enabled
  - `isSelected` **(boolean)** - if the control is selected. Not available for `wrapper`.
  - `isHovered` **(boolean)** - if the pointer is hovering over the control. Not available for `wrapper`.
