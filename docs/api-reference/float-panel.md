# FloatPanel

A stateless component that renders a floating panel.

**Features**

* Move
* Resize
* Minimize
* Constrain inside bounds

## Usage

    import FloatPanel from '@uber/float-panel';

    <FloatPanel title="My Window" x={0} y={10} width={200} height={200} />

## API Reference

## Props

* `title` **(string|Element)** - content to display in the title bar. If empty, the title bar will be hidden.
* `x` **(number)** - position from the left in pixels
* `y` **(number)** - position from the top in pixels
* `width` **(number)** - width of the panel
* `height` **(number)** - height of the panel
* `className` **(string, optional)** - additional class name for the container
* `parentWidth` **(number, optional)** - width of the parent window
* `parentHeight` **(number, optional)** - height of the parent window. If parent window size is specified, the panel cannot be moved outside of its bounds.
* `minimized` **(boolean, optional)** - whether the panel is minimized (show only title bar)
* `movable` **(boolean, optional)** - whether the panel can be moved, default true
* `resizable` **(boolean, optional)** - whether the panel can be resized, default false
* `minimizable` **(boolean, optional)** - whether the panel can be minimized, default true
* `onUpdate` **(function, optional)** - callback when user move/resize/minimize the panel
