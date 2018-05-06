/* global document */
import React, {PureComponent} from 'react';
import {render} from 'react-dom';

import 'monochrome/main.scss';

import PopoverExample from './popover';

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
      </div>
    );
  }
}

const root = document.createElement('div');
document.body.appendChild(root);

render(<Example />, root);
