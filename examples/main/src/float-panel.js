import React, {Component} from 'react';
import {AutoSizer, FloatPanel} from 'monochrome';

/**
 * Float Panel Example
 */
export default class FloatPanelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useTitleBar: true,
      panelState: {
        x: 0,
        y: 0,
        size: 200,
        minimized: false
      }
    };
  }

  _onUpdatePanel = ({x, y, width, minimized}) => {
    width = Math.min(400, Math.max(50, width));

    this.setState({
      panelState: {x, y, minimized, size: width}
    });
  };

  render() {
    const {
      panelState: {x, y, size, minimized},
      useTitleBar
    } = this.state;

    const containerStyle = {
      position: 'relative',
      background: '#efefef',
      height: 400
    };

    return (
      <div>
        <div>
          <input
            type="checkbox"
            id="useTitleBar"
            checked={useTitleBar}
            onChange={e => this.setState({useTitleBar: e.target.checked})}
          />
          <label htmlFor="useTitleBar">Use Title Bar</label>
        </div>
        <div style={containerStyle}>
          <AutoSizer>
            {({width, height}) => (
              <FloatPanel
                title={useTitleBar ? 'My Photo' : null}
                parentWidth={width}
                parentHeight={height}
                x={x}
                y={y}
                width={size}
                height={size}
                minimized={minimized}
                movable={true}
                resizable={true}
                minimizable={true}
                onUpdate={this._onUpdatePanel}
              >
                <img
                  src="https://avatars2.githubusercontent.com/u/2059298?v=3&s=460"
                  width="100%"
                />
              </FloatPanel>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}
