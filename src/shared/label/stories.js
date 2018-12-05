import React from 'react';
import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import Label from './index';

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('Label', () => (
    <Label tooltip="Last, First" isEnabled={boolean('isEnabled', true)}>
      Your name
    </Label>
  ));
