# Dropdown

A stateless dropdown control component.

## Usage

    import {Dropdown} from 'monochrome';

    <Dropdown label="Pet" value="cat" data={{
      cat: 'Cat',
      dog: 'Dog',
    }} onChange={...} />

## API Reference

### Props

* `value` **(string)** - value of the dropdown.
* `onChange` **(function)** - callback when the value is changed by user action.
* `data` **(object)** - value to label mapping.
* `size` **(number, optional)** - size of the dropdown. Default is `18`.
* `isEnabled` **(boolean, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.
* `label` **(string, optional)** - label for the control.
* `tooltip` **(string, optional)** - forwarded to the Label compoenent.


### CSS Classes

* `mc-dropdown` - wrapper element around both the label and dropdown control.
* `mc-dropdown--container` - wrapper element around the dropdown control.
* `mc-dropdown--arrow` - the arrow element on the right of the dropdown.
