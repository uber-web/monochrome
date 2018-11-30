import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import DragDropListItem from './drag-drop-list-item';
import {overlap, offsetRect} from './utils';

const noop = () => {};

export default class DragDropList extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        className: PropTypes.string,
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func])
      })
    ),
    canRemoveItem: PropTypes.bool,
    onListChange: PropTypes.func
  };

  static defaultProps = {
    canRemoveItem: false,
    onListChange: noop
  };

  state = {
    // Temporarily re-arranged items list, used during drag
    items: null,
    targetIndex: -1
  };

  _onDragStart = targetItem => {
    const {items} = this.props;
    // Update bounding boxes
    // This is dependent on page scroll, needs update every time drag starts
    const boundingBoxes = items.map(item => {
      item.boundingBox = item.instance.getBoundingBox();
      return item.boundingBox;
    });

    this.setState({
      items: items.slice(),
      boundingBoxes,
      targetItem,
      targetIndex: items.indexOf(targetItem),
      removedIndex: -1
    });
  };

  _onDragMove = pos => {
    const {items, targetItem, boundingBoxes, targetIndex} = this.state;

    let nextIndex = -1;
    let maxOverlap = 0;

    const targetRect = offsetRect(targetItem.boundingBox, [pos.deltaX, pos.deltaY]);

    boundingBoxes.forEach((boundingBox, i) => {
      const p = overlap(boundingBox, targetRect);
      if (p > maxOverlap) {
        nextIndex = i;
        maxOverlap = p;
      }
    });

    if (nextIndex < 0) {
      // removed
      if (this.props.canRemoveItem) {
        this.setState({removedIndex: targetIndex});
      }
    } else {
      if (nextIndex !== targetIndex) {
        items.splice(targetIndex, 1);
        items.splice(nextIndex, 0, targetItem);
      }
      this.setState({targetIndex: nextIndex, removedIndex: -1});
    }
  };

  _onDragEnd = pos => {
    const {items, targetItem, removedIndex} = this.state;

    const removedItems = removedIndex >= 0 ? items.splice(removedIndex, 1) : [];
    const targetRect = offsetRect(targetItem.boundingBox, [pos.deltaX, pos.deltaY]);

    this.props.onListChange({items, removedItems, targetRect});
    this.setState({items: null});
  };

  renderContent({content}) {
    return typeof content === 'function' ? content() : content;
  }

  render() {
    const items = this.state.items || this.props.items;

    return (
      <div className="mc-drag-drop-list" style={{userSelect: 'none'}}>
        {items &&
          items.map((item, i) => (
            <DragDropListItem
              key={item.key}
              ref={instance => {
                item.instance = instance;
              }}
              title={item.title}
              removed={i === this.state.removedIndex}
              className={item.className}
              onDragStart={this._onDragStart.bind(this, item)}
              onDragMove={this._onDragMove}
              onDragEnd={this._onDragEnd}
            >
              {this.renderContent(item)}
            </DragDropListItem>
          ))}
      </div>
    );
  }
}
