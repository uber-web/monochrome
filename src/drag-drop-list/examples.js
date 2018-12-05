import React, {Component} from 'react';
import {boolean, button} from '@storybook/addon-knobs';
import DragDropList from './index';

const SAMPLE_ITEMS = new Array(10).fill(0).map((d, i) => ({
  key: `item-${i}`,
  className: 'sample-item',
  content: <p>ITEM {i + 1}</p>
}));

const SAMPLE_ITEMS_WITH_HEADER = new Array(8).fill(0).map((d, i) => ({
  key: `item-${i}`,
  title: `ITEM ${i + 1}`,
  className: 'sample-item',
  content: <p>This is the content</p>
}));

const EXAMPLE_STYLE = `
.sample-item { padding: 12px; font-size: 12px; border: 1px solid #fff; background: #f8f8fe; }
`;

/**
 * Drag Drop List Example
 */
class DragDropListExample extends Component {
  state = {
    items: SAMPLE_ITEMS
  };

  _onListChange({items}) {
    this.setState({items});
  }

  useWithHeaders = () => {
    this.setState({items: SAMPLE_ITEMS_WITH_HEADER});
  };

  useWithoutHeaders = () => {
    this.setState({items: SAMPLE_ITEMS});
  };

  render() {
    button('withHeaders', this.useWithHeaders);
    button('withoutHeaders', this.useWithoutHeaders);
    const {items} = this.state;

    return (
      <div>
        <style>{EXAMPLE_STYLE}</style>
        <div style={{width: 200}}>
          <DragDropList
            items={items}
            transition={300}
            canRemoveItem={boolean('Can remove items', true)}
            onListChange={this._onListChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export const tests = {
  DRAG_AND_DROP_EXAMPLE: 'Basic example'
};

export default {
  [tests.DRAG_AND_DROP_EXAMPLE]: function exampleOne() {
    return <DragDropListExample />;
  }
};
