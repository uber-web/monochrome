import React from 'react';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import {Popover, Tooltip} from './index';

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('Popover', () => (
    <Popover
      content={() => (
        <div style={{padding: '10px'}}>
          <div>
            <button>One fish</button>
          </div>
          <div style={{marginTop: '5px'}}>
            <button>Two fish</button>
          </div>
          <div style={{marginTop: '5px'}}>
            <button>Red fish</button>
          </div>
          <div style={{marginTop: '5px'}}>
            <button>Blue fish</button>
          </div>
        </div>
      )}
    >
      <button>Click for popover</button>
    </Popover>
  ))
  .add('Tooltip', () => (
    <div style={{fontFamily: 'Helvetica, sans-serif', margin: 100, fontSize: 13}}>
      <p>
        <Tooltip position={Popover.RIGHT} content="Tooltip">
          Right
        </Tooltip>
      </p>
      <p>
        <Tooltip position={Popover.BOTTOM} content="Tooltip">
          Bottom
        </Tooltip>
      </p>
      <p>
        <Tooltip position={Popover.LEFT} content="Tooltip">
          Left
        </Tooltip>
      </p>
      <p>
        <Tooltip position={Popover.TOP} content="Tooltip">
          Top
        </Tooltip>
      </p>
      <p>
        <Tooltip
          position={Popover.RIGHT}
          arrowPosition={Popover.BOTTOM}
          content={() => (
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt et enim vel
              pellentesque. Aliquam nisl est, dapibus et leo sit amet, venenatis placerat sem.
            </span>
          )}
        >
          <span>Custom positioning</span>
        </Tooltip>
      </p>
    </div>
  ));
