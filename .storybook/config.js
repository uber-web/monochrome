import {configure, addDecorator} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';

// automatically import all files named stories.js
const req = require.context('../src', true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
addDecorator(withInfo);
addDecorator(withKnobs);
configure(loadStories, module);
