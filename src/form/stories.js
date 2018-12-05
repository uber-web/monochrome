import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import README from './README.md';
import Form from './index';
import {CheckBox} from '../shared';

const SETTINGS = {
  title: {type: 'title', title: 'My App Settings'},

  sectionSeparator: {type: 'separator'},

  sectionHeader: {type: 'header', title: 'Section Header'},

  showTitle: {type: 'toggle', title: 'Show Title'},

  // Nested options example
  richText: {
    type: 'toggle',
    title: 'Rich Text',
    tooltip: 'Fancy text formatting',
    warning: 'An example warning',
    children: {
      format: {
        type: 'select',
        visible: true,
        enabled: ({richText}) => richText,
        title: 'Format',
        data: {html: 'HTML', markdown: 'Markdown'}
      },
      flavor: {
        type: 'select',
        tooltip: 'Markdown syntax',
        visible: ({format}) => format === 'markdown',
        enabled: ({richText}) => richText,
        title: 'Flavor',
        data: {standard: 'Standard', github: 'GitHub', wikipedia: 'Wikipedia'}
      },
      stylesheet: {
        type: 'select',
        title: 'Stylesheet',
        visible: true,
        enabled: ({richText}) => richText,
        data: {light: 'Light', dark: 'Dark'}
      }
    }
  },

  fontSize: {
    type: 'range',
    tooltip: 'Size of text in pixels',
    title: 'Font Size',
    min: 10,
    max: 80
  },

  fontFamily: {type: 'text', tooltip: 'Fontface', title: 'Font Family'},

  alignment: {
    type: 'radio',
    tooltip: 'Align text with viewport',
    title: 'Alignment',
    data: {
      left: 'Left',
      right: 'Right',
      center: 'Center'
    }
  },

  autocorrect: {
    type: 'checkbox',
    title: 'Autocorrect',
    visible: true,
    collapsible: true,
    children: {
      spelling: {
        type: 'checkbox',
        title: 'Spelling',
        visible: true
      },
      grammer: {
        type: 'checkbox',
        title: 'Grammer',
        visible: true
      }
    }
  }
};

const STYLES = {
  wrapper: {
    padding: 24
  },
  label: {
    tooltip: {
      arrowSize: 0,
      borderWidth: 0
    }
  }
};

class FormExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        showTitle: true,
        richText: true,
        format: 'markdown',
        flavor: 'github',
        stylesheet: 'light',
        fontSize: 24,
        fontFamily: 'Clan Pro Medium',
        alignment: 'left',
        autocorrect: CheckBox.INDETERMINATE,
        spelling: CheckBox.ON,
        grammer: CheckBox.OFF
      }
    };
  }

  _onSettingsChange(changedSettings) {
    const newState = Object.assign({}, this.state.values, changedSettings);
    if (changedSettings.spelling || changedSettings.grammer) {
      if (newState.spelling === newState.grammer) {
        newState.autocorrect = newState.spelling;
      } else {
        newState.autocorrect = CheckBox.INDETERMINATE;
      }
    } else if (changedSettings.autocorrect) {
      newState.spelling = changedSettings.autocorrect;
      newState.grammer = changedSettings.autocorrect;
    }

    this.setState({
      values: newState
    });
  }

  render() {
    return (
      <Form
        data={SETTINGS}
        style={STYLES}
        values={this.state.values}
        onChange={this._onSettingsChange.bind(this)}
      />
    );
  }
}

storiesOf('Form', module)
  .addDecorator(withReadme(README))
  .add('Basic example', () => <FormExample />);
