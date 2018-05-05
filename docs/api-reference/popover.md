# Popovers

> Popover and tooltip components that you can rely on.

## Background

The superfine tooltip and popover components (@uber/react-tooltip and @uber/react-popover) have a number
of shortcomings that make them difficult to use. In this package we offer some alternative components
which have the following benefits:

- **Performance** - The ability to pass a render callback for the tooltip/popover content means your app won't waste time constructing components that aren't visible yet.
- **Positioning** - Automatic positioning and bounds detection, so your tooltips never get clipped by the viewport.
- **Themes** - This package supports both a dark and light theme
- **Better default styles** - More sensible defaults for typography and padding, and the ability to override styles when desired.

### Install

    yarn add @uber/vis-popovers

Usage:

    import {Tooltip} from '@uber/vis-popovers';

    <Tooltip content={() => <span>Bonjour!</span>}>
      Hover here
    </Tooltip>

All styles are inlined as html style attributes, so there are no stylesheets to import.

### API Reference

This package exports both a `Tooltip` and `Popover` component, as well as `POSITIONS`, `SIZES`, `TRIGGERS`, and `THEMES` constants in case you'd like to use them.

#### Components

### `<Tooltip>`

##### PROPS

**content** - *PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired* - The content to render inside the tooltip body, either as a render callback function or react node. We recommend using a callback so that the content is rendered lazily for performance.

**position** - *PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'auto'])* - Position of the tooltip relative to the target content. Defaults to top.

**arrowPosition** - *PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'auto'])* - Controls which end of the tooltip the arrow should be anchored on. Default is auto, which is generally centered.

**horizontalSize** - *PropTypes.oneOf(['small', 'medium', 'large', 'none'])* - Sets the default `maxWidth` of the tooltip to a preset value. Using maxWidth means that tooltips with little content don't have a bunch of extra whitespace. Default is `medium`, which is 300px.

**theme** - *PropTypes.oneOf(['light', 'dark'])* - Changes the visual style of the tooltip to light or dark. Default is dark.

**onMouseOutDelay** - *PropTypes.number* - Number of milliseconds to wait before hiding tooltip after users mouse leaves target, allowing them to interact with the tooltip content (highlight it, etc.)

**style** - *PropTypes.object* - Because this component wraps the content that triggers the tooltip, it can affect the layout of this content. We use `display: inline-flex` for the trigger content by default, but you may use this prop to pass in a different display type or other style overrides.

**tooltipStyle** - *PropTypes.object* - Custom styles for the tooltip itself

### `<Popover>`

##### PROPS

**content** - *PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired* - The content to render inside the popover body, either as a render callback function or react node. We recommend using a callback so that the content is rendered lazily for performance.

**position** - *PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'auto'])* - Position of the popover relative to the target content. Defaults to auto.

**arrowPosition** - *PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'auto'])* - Controls which end of the popover the arrow should be anchored on. Default is auto, which is generally centered.

**theme** - *PropTypes.oneOf(['light', 'dark'])* - Changes the visual style of the popover to light or dark. Default is light.

**onMouseOutDelay** - *PropTypes.number* - If `trigger` is `hover`, this is the number of milliseconds to wait before hiding popover after users mouse leaves target, allowing them to interact with the popover content (highlight it, etc.)

**style** - *PropTypes.object* - Because this component wraps the content that triggers the popover, it can affect the layout of this content. We use `display: inline-flex` for the trigger content by default, but you may use this prop to pass in a different display type or other style overrides.

**bodyStyle** - *PropTypes.object* - Custom styles for the popover itself

**showArrow** - *PropTypes.bool* - Whether or not to show the arrow pointing from the popover to the target. Defaults to true.

**arrowSize** - *PropTypes.number* - How big the arrow should be in pixels

**trigger** - *PropTypes.oneOf(['hover', 'click'])* - Whether to show the popover on hover or click of the target. Default is click.

#### Constants

#### `POSITIONS`

**TOP**: `'top'`
**RIGHT**: `'right'`
**BOTTOM**: `'bottom'`
**LEFT**: `'left'`
**AUTO**: `'auto'`

#### `SIZES`

**SMALL**: `'small'` (150px)
**MEDIUM**: `'medium'` (300px)
**LARGE**: `'large'` (500px)
**NONE**: `'none'` (no max-width)

#### `THEMES`

**LIGHT**: `'light'`
**DARK**: `'dark'`

#### `TRIGGERS`

**HOVER**: `'hover'`
**CLICK**: `'click'`

#### CSS Classes

Most styles can be overridden using the `style` and `bodyStyle` props, but if you'd prefer css classnames, the following classes are available:

- `u-popover-wrapper`: We add a wrapper element around both the target element and the tooltip. You might use this class to change the `display` property or other related css rules.
- `u-popover-target`: Wrapper element around the target element.
- `u-popover-body`: Element for the popover/tooltip.
- `u-popover-arrow`: The small arrow that points from the popover/tooltip to the target.
