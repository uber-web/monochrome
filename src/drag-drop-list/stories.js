/* eslint-env node */
// @flow

import {storiesOf} from '@storybook/react';
import examples from './examples';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Form control', module).add(description, example)
);
