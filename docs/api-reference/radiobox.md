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


### CSS Classes

* `mc-radiobox` - wrapper element around all radio controls.
* `mc-radiobox--item` - wrapper element around each label and radio button.
* `mc-radiobox--button` - the border element of the radio button.
* `mc-radiobox--icon` - the icon element of the radio bottom.
