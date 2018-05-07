import React, {Component} from 'react';
import {FloatPanel} from 'monochrome';

/**
 * Float Panel Example
 */
export default class FloatPanelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 400,
      useTitleBar: true,
      panelState: {
        x: 0,
        y: 0,
        size: 200,
        minimized: false
      }
    };
  }

  componentDidMount() {
    const container = this.refs.container;

    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      windowWidth: container.clientWidth
    });
    /* eslint-enable react/no-did-mount-set-state */
  }

  _onUpdatePanel({x, y, width, minimized}) {
    width = Math.min(400, Math.max(50, width));

    this.setState({
      panelState: {x, y, minimized, size: width}
    });
  }

  render() {
    const {
      panelState: {x, y, size, minimized},
      useTitleBar,
      windowWidth,
      windowHeight
    } = this.state;
    const containerStyle = {
      position: 'relative',
      background: '#efefef',
      width: windowWidth.width || '100%',
      height: windowHeight
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
        <div style={containerStyle} ref="container">
          <FloatPanel
            title={useTitleBar ? 'My Photo' : null}
            parentWidth={windowWidth}
            parentHeight={windowHeight}
            x={x}
            y={y}
            width={size}
            height={size}
            minimized={minimized}
            movable={true}
            resizable={true}
            minimizable={true}
            onUpdate={this._onUpdatePanel.bind(this)}
          >
            <img src="https://avatars2.githubusercontent.com/u/2059298?v=3&s=460" width="100%" />
          </FloatPanel>
        </div>
      </div>
    );
  }
}
