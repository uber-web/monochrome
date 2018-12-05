import {configure, addDecorator} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import {withOptions} from '@storybook/addon-options';

// automatically import all files named stories.js
const req = require.context('../src', true, /stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withOptions({
  name: 'monochrome',
  url: 'https://github.com/uber-web/monochrome',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  selectedAddonPanel: 'README'
}));

addDecorator(withKnobs);

configure(loadStories, module);
