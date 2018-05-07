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
* `isEnabled` **(bool, optional)** - whether the control is enabled. Default is `true`.
* `className` **(string, optional)** - custom class name for the control.


### CSS Classes

* `mc-radio-box` - wrapper element around all radio controls.
* `mc-radio-box--item` - wrapper element around each label and radio button.
* `mc-radio-box--button` - the border element of the radio button.
* `mc-radio-box--icon` - the icon element of the radio bottom.
