import React, {Component} from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import Slider from './index';

class SliderExample extends Component {
  state = {
    value: 50
  };

  render() {
    return (
      <Slider
        isEnabled={boolean('isEnabled', true)}
        value={this.state.value}
        min={0}
        max={100}
        step={1}
        onChange={value => this.setState({value})}
      />
    );
  }
}

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('Slider', () => <SliderExample />);
