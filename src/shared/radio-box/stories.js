import React, {Component} from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import RadioBox from './index';

const SAMPLE_DATA = {
  cat: 'Cat',
  dog: 'Dog',
  banana: 'Banana'
};

class RadioBoxExample extends Component {
  state = {
    value: 'cat'
  };

  render() {
    return (
      <RadioBox
        data={SAMPLE_DATA}
        isEnabled={boolean('isEnabled', true)}
        value={this.state.value}
        onChange={value => this.setState({value})}
      />
    );
  }
}

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('RadioBox', () => <RadioBoxExample />);
