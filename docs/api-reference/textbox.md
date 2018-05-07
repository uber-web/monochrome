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


### CSS Classes

* `mc-text-box` - wrapper element around both the label and the text box.
* `mc-text-box--container` - wrapper element around the text box.
* `mc-text-box--clear` - the clear button.
