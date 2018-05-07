# Popover

Popover and tooltip components.

## Usage

    import {Popover, Tooltip} from 'monochrome';

    <Popover content={() => <span>Bonjour!</span>}>
      Click here
    </Popover>
    <Tooltip content={() => <span>Bonjour!</span>}>
      Hover here
    </Tooltip>

All styles are inlined as html style attributes, so there are no stylesheets to import.

## API Reference

### Props

* `content` **(node|function)** - The content to render inside the popover body, either as a render callback function or react node. We recommend using a callback so that the content is rendered lazily for performance.
* `position` **(enum, optional)** - Position of the popover relative to the target content. See constants:positions below. Defaults to `Popover.AUTO`.
* `arrowPosition` **(enum, optional)** - Controls which end of the popover the arrow should be anchored on. See constants:positions below. Default is `Popover.AUTO`, which is generally centered.
* `onMouseOutDelay` **(number, optional)** - If `trigger` is `hover`, this is the number of milliseconds to wait before hiding popover after users mouse leaves target, allowing them to interact with the popover content (highlight it, etc.)
* `showArrow` **(boolean, optional)** - Whether or not to show the arrow pointing from the popover to the target. Default is `true`.
* `arrowSize` **(number, optional)** - How big the arrow should be in pixels. Default is `6`.
* `trigger` **(enum)** - Whether to show the popover on hover or click of the target. See constants:triggers below. Default is `Popover.CLICK`. The `Tooltip` class is a convenient component that renders a popover that triggers on hover.


### Constants

Positions:

* `Popover.TOP`
* `Popover.BOTTOM`
* `Popover.LEFT`
* `Popover.RIGHT`
* `Popover.AUTO`

Triggers:

* `Popover.HOVER`
* `Popover.CLICK`


### CSS Classes

The following classes are available:

- `mc-popover`: We add a wrapper element around both the target element and the tooltip. You might use this class to change the `display` property or other related css rules.
- `mc-popover--target`: Wrapper element around the target element.
- `mc-popover--body`: Element for the popover/tooltip.
- `mc-popover--arrow-border`: The border of the arrow that points from the popover/tooltip to the target.
- `mc-popover--arrow`: The body of the arrow that points from the popover/tooltip to the target.
