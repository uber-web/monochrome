import React from 'react';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import Spinner from './index';

storiesOf('Building Blocks', module)
  .addDecorator(withReadme(README))
  .add('Spinner', () => <Spinner />);
