# Draggable

A React component that handles drag & drop events

## Usage

    import {Draggable} from 'monochrome';

    <Draggable onStart={...} onDrag={...} onEnd={...}>
        <div>My content</div>
    </Draggable>

## API Reference

### Props

* `className` **(string, optional)** - custom class name(s)
* `tolerance` **(object, optional)** - allow the user to start dragging without hitting the exact target. Default `0`.
* `isEnabled` **(boolean, optional)** - is component interactive. Default `true`.
* `onStart` **(function, optional)** - callback when mouse is down. Called with a single argument that is an *event object*.
* `onDrag` **(function, optional)** - callback when component is dragged (controlled by `threshold`). Called with a single argument that is an *event object*.
* `onEnd` **(function, optional)** - callback when mouse is released. Called with a single argument that is an *event object*.

### Event Object

* `srcEvent` - original React event
* `x` - pointer x relative to the window
* `y` - pointer y relative to the window
* `offsetX` - pointer x relative to the container
* `offsetY` - pointer y relative to the container
* `deltaX` - pointer x relative to the pick up position
* `deltaY` - pointer y relative to the pick up position
* `hasDragged` - if the component has been dragged before this event (controlled by `threshold`)
