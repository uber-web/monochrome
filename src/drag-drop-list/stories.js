/* eslint-env node */
// @flow

import {storiesOf} from '@storybook/react';
import examples from './examples';
import README from './README.md';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('DragDropList', module).add(description, example, {
    info: {
      header: true,
      text: README
    }
  })
);
