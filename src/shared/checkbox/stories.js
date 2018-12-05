import React, {Component} from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import CheckBox from './index';

class CheckBoxExample extends Component {
  state = {
    value: CheckBox.ON
  };

  render() {
    return (
      <CheckBox
        isEnabled={boolean('isEnabled', true)}
        value={this.state.value}
        label="I am a cat person"
        onChange={value => this.setState({value})}
      />
    );
  }
}

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('CheckBox', () => <CheckBoxExample />);
