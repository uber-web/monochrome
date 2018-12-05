import React, {Component} from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import FloatPanel from './index';
import {AutoSizer} from '../shared';

/**
 * Float Panel Example
 */
class FloatPanelExample extends Component {
  state = {
    x: 0,
    y: 0,
    size: 200,
    minimized: false
  };

  _onUpdatePanel = ({x, y, width, minimized}) => {
    width = Math.min(400, Math.max(50, width));

    this.setState({x, y, minimized, size: width});
  };

  render() {
    const {x, y, size, minimized} = this.state;

    return (
      <div style={{height: '100vh'}}>
        <AutoSizer>
          {({width, height}) => (
            <FloatPanel
              title={'My Photo'}
              parentWidth={width}
              parentHeight={height}
              x={x}
              y={y}
              width={size}
              height={size}
              minimized={minimized}
              movable={boolean('movable', true)}
              resizable={boolean('resizable', true)}
              minimizable={boolean('minimizable', true)}
              onUpdate={this._onUpdatePanel}
            >
              <img src="https://avatars2.githubusercontent.com/u/2059298?v=3&s=460" width="100%" />
            </FloatPanel>
          )}
        </AutoSizer>
      </div>
    );
  }
}

storiesOf('FloatPanel', module)
  .addDecorator(withReadme(README))
  .add('Basic example', () => <FloatPanelExample />);
