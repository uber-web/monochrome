/* eslint-env node */
import React from 'react';
import {boolean, select} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import Button from './index';

const typeOptions = {
  Normal: Button.NORMAL,
  Primary: Button.PRIMARY,
  Waring: Button.WARNING,
  Muted: Button.MUTED
};

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('Button', () => (
    <Button type={select('Type', typeOptions)} isEnabled={boolean('isEnabled', true)}>
      Click me!
    </Button>
  ));
