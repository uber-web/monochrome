/* eslint-env node */
import React, {Component} from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import Toggle from './index';

class ToggleExample extends Component {
  state = {
    value: true
  };

  render() {
    return (
      <Toggle
        isEnabled={boolean('isEnabled', true)}
        value={this.state.value}
        onChange={value => this.setState({value})}
      />
    );
  }
}

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('Toggle', () => <ToggleExample />);
