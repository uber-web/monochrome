# DragDropList

A stateless component that renders a list of items that can be reorganized using drag and drop.

## Usage

    import DragDropList from 'monochrome';

    <DragDropList items={[
        {key: '0', content: 'Item 0'},
        {key: '1', content: 'Item 1'},
        {key: '2', content: 'Item 2'}
      ]} onListChange={...} />

## API Reference

### Props

* `items` **(array)** - list of items to render. Each item should have the following fields:
  + `key` **(string)** - unique identifier
  + `content` **(node)** - renderable content of the item
  + `[title]` **(string)** - header of the item. If specified, only the header is draggable.
  + `[className]` **(string)** - additional class name
* `canRemoveItem` **(boolean)** - whether an item can be removed if it's dragged too far.
Default `false`.
* `onListChange` **(function)** - callback when the user drops an item.
Parameters:
  + `event.items` **(array)** - rearranged items list
  + `event.removedItems` **(array)** - removed items
  + `event.targetRect` **(object)** - the bounding box of where the item is dropped
