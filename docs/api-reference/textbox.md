# TextBox

A stateless text box component.

## Usage

    import {TextBox} from 'monochrome';

    <TextBox label="Your name" value="John Smith" onChange={...} />

## API Reference

### Props

* `value` **(string)** - value of the text box.
* `onChange` **(function)** - callback when the value is changed by user action.
* `size` **(number, optional)** - size of the text box. Default is `18`.
* `showClearButton` **(boolean, optional)** - whether to show a "clear all" button when the text box is not empty. Default is `true`.
* `isEnabled` **(boolean, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.
* `label` **(string, optional)** - label for the control.
* `tooltip` **(string, optional)** - forwarded to the Label compoenent.
* `style` **(string, optional)** - custom style. See "styling" section below.


### Styling

The `style` prop expects an object that may contain the following keys:

* `wrapper` -  wrapper element around both the label and text box.
* `border` - the border around the text box.
* `input` - the <input> element.
* `clear` - the clear button.
* `height` **(number)** - height of the check box. Default is `26`.
* `label` - the label. This value will be passed to the [Label](/docs/api-reference/label.md) component.

The values define the styling overrides for the respective child components. Unless noted otherwise, each value is an object, or a callback function.

```jsx
const textboxStyle = {
  border: props => ({
    borderColor: props.hasFocus ? 'red' : '#ccc'
  })
};
```

A custom style callback function will receive the following arguments:

* `props` **(object)**
  - `theme` **(object)** - the current theme
  - `height` **(number)** - the height of the text box
  - `hasFocus` **(boolean)** - if the control has focus
  - `isEnabled` **(boolean)** - if the control is enabled
  - `isHovered` **(boolean)** - if the pointer is hovering over the control
