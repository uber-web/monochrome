# Styling Guide

## General Usage

Monochrome components are meant to be used together with its stylesheet. 

```js
// Import component
import {Form} from 'monochrome';
// Import CSS stylesheet
import 'monochrome/dist/main.css';
```

`main.css` contains the default style of all components.

Alternatively, you may only import the stylesheet of a single component:

```js
// Import component
import Form from 'monochrome/dist/es6/form';
// Import CSS stylesheet
import 'monochrome/dist/es6/form/style.css';
```


## Style Overrides And Themes

Import stylesheet in Sass:
```sass
/* Import theme */
@import 'node_modules/monochrome/src/themes/light';

/* Theme overrides */
$color-text-primary: #1C1B1B;

/* Main stylesheet */
@import 'node_modules/monochrome/src/main';
```

There are preset themes in [src/themes](../src/themes) and you may copy them and create your own.


## Contributor Guide

When adding a new component to Monochrome, follow these general guidelines when deciding how styles are applied:

### JS vs. CSS

* CSS rules that are criticle to the functionality - i.e. removing them will break the component - should be defined in JS. For example:
  + `zIndex: 999` of a modal
  + `position: absolute` of a floating component
* CSS rules that are aesthetic and re-stylable should be defined in SASS. For example:
  + `color: #A0ECEC` of a label
  + `padding: 4px 8px` of a popover
* All SASS rules of a given component must be wrapped inside a single class selector. For example:
  + All rules for the TextBox component are children of `.mc-textbox-wrapper`
* Each JavaScript endpoint (`index.js`) must be accompanied by a SASS endpoint named `style.scss`. Importing this stylesheet should be sufficient to style anything created by the JS components.

### Writing SASS

* All SASS rules must target a clearly defined class selector. For example:
  + `.mc-dropdown--input` is good; `select` is bad
  + `.mc-table--cell` is good; `.mc-table--row > div` is bad
* Class naming conventions:
  + Class names that are used to identify an element should start with `mc-`, followed by the top-level component name.
  + Sub-elements of a top-level component are named in the format of `mc-<component>--<element>`.
  + Elements that already have a `mc-*` class name may be further decorated with state classes, e.g. `disabled` and `active`.
* Only use pseudo elements `:before` and `:after` to customize the text content of an element. For example:
  + `.mc-radio-box--icon:before {content: '●'}` is good
  + `.mc-playback-control--tick {display: block; content: ''; width: 1px; height: 4px; background: #000;}` is bad. Instead, create a sub-element with its own class name.
* The following CSS property values should be imported from a theme instead of specified inline:
  + `color`
  + `background`
  + `font`
  + `margin`
  + `padding`
  + `box-shadow`
  + `transition`
  + `border`
