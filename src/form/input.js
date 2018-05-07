import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {CheckBox, Dropdown, RadioBox, Slider, TextBox, Toggle} from '../shared';

const CLASS_NAME = 'mc-form--input';

export default class Input extends PureComponent {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);

    this.renders = {
      title: this._renderTitle,
      header: this._renderHeading,
      separator: this._renderSeparator,
      toggle: this._renderToggle,
      text: this._renderTextBox,
      range: this._renderSlider,
      select: this._renderDropdown,
      radio: this._renderRadio,
      checkbox: this._renderCheckbox,
      custom: this._renderCustom
    };
  }

  _onChange = (value) => {
    this.props.onChange(this.props.name, value);
  }

  _renderTitle = () => {
    return <div className="mc-form--title">{this.props.label}</div>;
  }

  _renderHeading = () => {
    return <div className="mc-form--heading">{this.props.label}</div>;
  }

  _renderSeparator = () => {
    return <hr className="mc-form--separator" />;
  }

  _renderToggle = () => {
    const {label, value, className} = this.props;
    const onTitle = this.props.onTitle || label;
    const offTitle = this.props.offTitle || label;

    return (
      <Toggle {...this.props}
        className={classnames(className, CLASS_NAME)}
        label={value ? onTitle : offTitle}
        onChange={this._onChange} />
    );
  }

  _renderSlider = () => {
    return (
      <Slider {...this.props}
        className={classnames(this.props.className, CLASS_NAME)}
        onChange={this._onChange} />
    );
  }

  _renderDropdown = () => {
    return (
      <Dropdown {...this.props}
        className={classnames(this.props.className, CLASS_NAME)}
        onChange={this._onChange} />
    );
  }

  _renderRadio = () => {
    return (
      <RadioBox {...this.props}
        className={classnames(this.props.className, CLASS_NAME)}
        onChange={this._onChange} />
    );
  }

  _renderTextBox = () => {
    return (
      <TextBox {...this.props}
        className={classnames(this.props.className, CLASS_NAME)}
        onChange={this._onChange} />
    );
  }

  _renderCheckbox = () => {
    return (
      <CheckBox {...this.props}
        className={classnames(this.props.className, CLASS_NAME)}
        onChange={this._onChange} />
    );
  }

  _renderCustom = () => {
    return this.props.render(this.props);
  }

  render() {
    const {type} = this.props;

    const render = this.renders[type];
    if (!render) {
      throw new Error(`Unknown setting type ${type}`);
    }

    return render();
  }
}
