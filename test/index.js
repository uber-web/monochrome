// Set up enzyme
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

// Alias
const {resolve} = require('path');
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  monochrome: resolve(__dirname, '../src')
});

// Module tests
require('./popover');
