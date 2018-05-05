import React, {Component} from 'react';

import {Popover, Tooltip} from 'monochrome/popover';

const triggerStyle = {
  fontWeight: 'bold',
  cursor: 'pointer',
  WebkitTextDecoration: 'black solid underline',
  textDecoration: 'black solid underline',
  WebkitTextDecorationSkip: 'ink',
  textDecorationSkip: 'ink'
};

export default class PopoverExample extends Component {
  render() {
    return (
      <div style={{display: 'flex', alignItems: 'top'}}>
        <div style={{marginRight: '40px'}}>
          <div>
            <code>&lt;Tooltip&gt;</code>
          </div>
          <div style={{marginTop: '20px'}}>
            <Tooltip content={() => <span>Bonjour!</span>}>
              <span style={triggerStyle}>Default tooltip</span>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              position="right"
              arrowPosition="bottom"
              content={() => (
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt et enim
                  vel pellentesque. Aliquam nisl est, dapibus et leo sit amet, venenatis placerat
                  sem.
                </span>
              )}
            >
              <span style={triggerStyle}>Custom positioning</span>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              theme="light"
              position="top"
              content={() => <span>Lorem ipsum dolor sit amet</span>}
            >
              <span style={triggerStyle}>Light theme</span>
            </Tooltip>
          </div>
          <div>
            <Tooltip theme="light" position="top" content={() => <span>Top</span>}>
              <span style={triggerStyle}>Top</span>
            </Tooltip>
            {' · '}
            <Tooltip theme="light" position="right" content={() => <span>Right</span>}>
              <span style={triggerStyle}>Right</span>
            </Tooltip>
            {' · '}
            <Tooltip theme="light" position="bottom" content={() => <span>Bottom</span>}>
              <span style={triggerStyle}>Bottom</span>
            </Tooltip>
            {' · '}
            <Tooltip theme="light" position="left" content={() => <span>Left</span>}>
              <span style={triggerStyle}>Left</span>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              position="bottom"
              arrowPosition="left"
              onMouseOutDelay={200}
              content={() => <span>Lorem ipsum dolor sit amet</span>}
            >
              <span style={triggerStyle}>Hide delay for tooltip interaction</span>
            </Tooltip>
          </div>
        </div>
        <div>
          <div>
            <code>&lt;Popover&gt;</code>
          </div>
          <div style={{marginTop: '20px'}}>
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
          </div>
        </div>
      </div>
    );
  }
}
