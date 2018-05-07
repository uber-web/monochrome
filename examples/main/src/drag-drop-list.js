import React, {Component} from 'react';
import {DragDropList} from 'monochrome';

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
button { margin-left: 12px; }
`;

/**
 * Drag Drop List Example
 */
export default class DragDropListExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: SAMPLE_ITEMS,
      canRemoveItem: true
    };
  }

  _onListChange({items}) {
    this.setState({items});
  }

  render() {
    const {items, canRemoveItem} = this.state;

    return (
      <div>
        <style>{EXAMPLE_STYLE}</style>
        <div style={{marginBottom: 24}}>
          <input
            type="checkbox"
            id="canRemoveItem"
            checked={canRemoveItem}
            onChange={e => this.setState({canRemoveItem: e.target.checked})}
          />
          <label htmlFor="canRemoveItem">Can Remove Items</label>
          <button onClick={() => this.setState({items: SAMPLE_ITEMS_WITH_HEADER})}>
            With Header
          </button>
          <button onClick={() => this.setState({items: SAMPLE_ITEMS})}>Without Header</button>
        </div>
        <div style={{width: 200}}>
          <DragDropList
            items={items}
            transition={300}
            canRemoveItem={canRemoveItem}
            onListChange={this._onListChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
