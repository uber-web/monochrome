import React, {Component} from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import TextBox from './index';

class TextBoxExample extends Component {
  state = {
    value: 'Cat'
  };

  render() {
    return (
      <TextBox
        isEnabled={boolean('isEnabled', true)}
        showClearButton={boolean('showClearButton', true)}
        value={this.state.value}
        onChange={value => this.setState({value})}
      />
    );
  }
}

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('TextBox', () => <TextBoxExample />);
