/* global document */
import React, {PureComponent} from 'react';
import {render} from 'react-dom';

import 'monochrome/main.scss';

import PopoverExample from './popover';
import BasicInputsExample from './inputs';
import DragDropListExample from './drag-drop-list';
import FloatPanelExample from './float-panel';

class Example extends PureComponent {
  state = {};

  render() {
    return (
      <div className="container">
        <h1>Monochrome</h1>

        <h2>Popover</h2>
        <section>
          <PopoverExample />
        </section>

        <h2>Inputs</h2>
        <section>
          <BasicInputsExample />
        </section>

        <h2>Drag Drop List</h2>
        <section>
          <DragDropListExample />
        </section>

        <h2>Float Panel</h2>
        <section>
          <FloatPanelExample />
        </section>
      </div>
    );
  }
}

const root = document.createElement('div');
document.body.appendChild(root);

render(<Example />, root);
