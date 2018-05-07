import React, {Component} from 'react';
import {Dropdown, RadioBox, Slider, Toggle, TextBox, CheckBox} from 'monochrome';

const SAMPLE_DATA = {
  cat: 'Cat',
  dog: 'Dog',
  banana: 'Banana'
};

export default class BasicInputsExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _enabled: true,
      dropdown: 'cat',
      radio: 'dog',
      slider: 0,
      toggle: true,
      textbox: '',
      checkbox: CheckBox.OFF
    };
  }

  _onSettingsChange(key, value) {
    this.setState({[key]: value});
  }

  _renderSectionHeader(name) {
    return <h3>{name}</h3>;
  }

  render() {
    const {_enabled} = this.state;

    return (
      <div>
        <Toggle
          label="Enable all"
          value={_enabled}
          onChange={this._onSettingsChange.bind(this, '_enabled')}
        />

        {this._renderSectionHeader('TextBox')}
        <TextBox
          label="Your name"
          tooltip="LAST, First"
          isEnabled={_enabled}
          value={this.state.textbox}
          onChange={this._onSettingsChange.bind(this, 'textbox')}
        />

        {this._renderSectionHeader('Dropdown')}
        <Dropdown
          data={SAMPLE_DATA}
          label="Pet"
          isEnabled={_enabled}
          value={this.state.dropdown}
          onChange={this._onSettingsChange.bind(this, 'dropdown')}
        />

        {this._renderSectionHeader('RadioBox')}
        <RadioBox
          data={SAMPLE_DATA}
          isEnabled={_enabled}
          value={this.state.radio}
          onChange={this._onSettingsChange.bind(this, 'radio')}
        />

        {this._renderSectionHeader('Slider')}
        <Slider
          min={0}
          max={1}
          step={0.01}
          isEnabled={_enabled}
          value={this.state.slider}
          onChange={this._onSettingsChange.bind(this, 'slider')}
        />

        {this._renderSectionHeader('Toggle')}
        <Toggle
          label="Do not disturb"
          tooltip="Disable notifications"
          isEnabled={_enabled}
          value={this.state.toggle}
          onChange={this._onSettingsChange.bind(this, 'toggle')}
        />

        {this._renderSectionHeader('Checkbox')}
        <CheckBox
          label="location services"
          isEnabled={_enabled}
          value={this.state.checkbox}
          onChange={this._onSettingsChange.bind(this, 'checkbox')}
        />
      </div>
    );
  }
}
