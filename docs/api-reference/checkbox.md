# CheckBox

A stateless, 3-state check box control component.

## Usage

    import {CheckBox} from 'monochrome';

    <CheckBox label="Include package" value={CheckBox.ON} onChange={...} />

## API Reference

### Props

* `value` **(enum)** - value of the check box. See constants below.
* `onChange` **(function)** - callback when the value is changed by user action.
* `size` **(number, optional)** - size of the check box. Default is `18`.
* `isEnabled` **(boolean, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.
* `label` **(string, optional)** - label for the control.
* `tooltip` **(string, optional)** - forwarded to the Label compoenent.


### Constants

Values:

* `CheckBox.ON`
* `CheckBox.OFF`
* `CheckBox.INDETERMINATE`

### CSS Classes

* `mc-checkbox` - wrapper element around both the label and the check box.
* `mc-checkbox--border` - the border element of the check box.
* `mc-checkbox--icon` - the icon element of the check box.
