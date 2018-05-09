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

        <h3>TextBox</h3>
        <TextBox
          label="Your name"
          tooltip="LAST, First"
          isEnabled={_enabled}
          value={this.state.textbox}
          onChange={this._onSettingsChange.bind(this, 'textbox')}
        />

        <h3>Dropdown</h3>
        <Dropdown
          data={SAMPLE_DATA}
          label="Pet"
          isEnabled={_enabled}
          value={this.state.dropdown}
          onChange={this._onSettingsChange.bind(this, 'dropdown')}
        />

        <h3>RadioBox</h3>
        <RadioBox
          label="Pet"
          data={SAMPLE_DATA}
          isEnabled={_enabled}
          value={this.state.radio}
          onChange={this._onSettingsChange.bind(this, 'radio')}
        />

        <h3>Slider</h3>
        <Slider
          label="Rating"
          min={0}
          max={1}
          step={0.01}
          isEnabled={_enabled}
          value={this.state.slider}
          onChange={this._onSettingsChange.bind(this, 'slider')}
        />

        <h3>Toggle</h3>
        <Toggle
          label="Do not disturb"
          tooltip="Disable notifications"
          isEnabled={_enabled}
          value={this.state.toggle}
          onChange={this._onSettingsChange.bind(this, 'toggle')}
        />

        <h3>Checkbox</h3>
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
