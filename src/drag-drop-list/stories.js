import React, {Component} from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import DragDropList from './index';
import README from './README.md';

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

const EXAMPLE_STYLE = {
  item: {
    padding: 12,
    border: '1px solid #fff',
    background: '#f8f8f8'
  },
  title: {
    padding: '4px 12px',
    margin: '-12px -12px 12px -12px',
    background: '#ccc',
    color: '#fff'
  }
};

/**
 * Drag Drop List Example
 */
class DragDropListExample extends Component {
  state = {
    items: null
  };

  _onListChange({items}) {
    this.setState({items});
  }

  render() {
    const items = this.state.items || this.props.items;

    return (
      <div style={{width: 200, margin: 'auto'}}>
        <DragDropList
          style={EXAMPLE_STYLE}
          items={items}
          canRemoveItem={boolean('canRemoveItem', true)}
          onListChange={this._onListChange.bind(this)}
        />
      </div>
    );
  }
}

storiesOf('DragDropList', module)
  .addDecorator(withReadme(README))
  .add('Basic example', () => <DragDropListExample items={SAMPLE_ITEMS} />)
  .add('With headers', () => <DragDropListExample items={SAMPLE_ITEMS_WITH_HEADER} />);
