# Form

This component sets up a list of input controls using JSON descriptors.

## Usage

    import {Form} from 'monochrome';

    <Form
      data={SETTINGS}
      values={this.state.values}
      onSettingsChange={values => this.setState({values: {...this.state.values, ...values}}) />

    const SETTINGS = {
      userHeader: {type: 'header', title: 'User Settings'},
      userType: {type: 'radio', title: 'Type', values: {
        visitor: 'Visitor',
        author: 'Author',
        admin: 'Admin'
      }},
      isPublic: {type: 'checkbox', title: 'Profile is public'},
      userName: {type: 'text', title: 'Display Name'},
      ...
    };

## API Reference

### Props

#### `data` (Object, required)

A map from key to config object for each input. Keys must be unique.

Config object fields:
* `type`: type of the control, see next section
* `title`: label of the control, usually displayed on top. Can be set to empty. Styling may vary based on the control type.
* `tooltip`: show hover tooltip that provides further information about this setting.
* `visible`: if this control is visible. Can be a boolean, or function that takes the current values object and returns a boolean.
* `enabled`: if this control is enabled. Can be a boolean, or function that takes the current values object and returns a boolean.
* `children`: a nested settings object. The nested controls will be indented to align with the parent label.

#### `values` (Object, required)

A flattened map from key to current value for each setting.

#### `onChange` (Function, required)

Callback when the value of an input is changed.


### Supported Control Types

Each control is a key value in the settings definitions object.
The name of the key will be used to update the separate settings value object.

#### Title

* `type` - `title`

Adds the title for a bigger section of setting controls.

#### Header

* `type` - `header`

Adds the title for a section of setting controls.

#### Separator

* `type` - `separator`

Adds a horizontal separator

#### Text

* `type` - `text`
* `showClearButton` **(boolean)** - whether should show a clear text button

Adds a text box.
See [TextBox](./textbox.md).

#### Range

* `type` - `range`
* `min` **(number)** - minimum value
* `max` **(number)** - maximum value
* `step` **(number)** - step value

Adds a slider.
See [Slider](./slider.md).

#### Radio

* `type` - `radio`
* `data` **(object)** - A value to display name mapping object

Adds a radio box.
See [RadioBox](./radiobox.md).

#### Select

* `type` - `select`
* `data` **(object)** - A value to display name mapping object

Adds a dropdown.
See [Dropdown](./dropdown.md).

#### Checkbox

* `type` - `checkbox`

Adds a 3-state checkbox. `value` is one of `on`, `indeterminate`, or `off`.
See [Checkbox](./checkbox.md).

#### Custom

* `type` - `custom`
* `render` **(function)** - A function that returns React node. Recieves self and `{isEnabled}` as arguments.

This can be used to a add a custom control to the form.
