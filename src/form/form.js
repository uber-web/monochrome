import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from './input';

const STYLES = {
  setting: {
    position: 'relative'
  },
  expander: {
    position: 'absolute',
    cursor: 'pointer'
  }
};

export default class Form extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {};

  state = {
    collapsed: {}
  };

  _onChange = (settingName, newValue) => {
    this.props.onChange({
      [settingName]: newValue
    });
  }

  toggleCollapsed({settingName, collapsed}) {
    const newCollapsedState = {...this.state.collapsed, [settingName]: !collapsed};
    this.setState({collapsed: newCollapsedState});
  }

  _renderSetting({settingName, setting, value, isEnabled = true}) {

    const {enabled = true, visible = true, children} = setting;
    let isVisible;

    if (typeof enabled === 'function') {
      isEnabled = isEnabled && enabled(this.props.values);
    } else {
      isEnabled = isEnabled && Boolean(enabled);
    }

    if (typeof visible === 'function') {
      isVisible = visible(this.props.values);
    } else {
      isVisible = Boolean(visible);
    }

    const collapsed = (typeof this.state.collapsed[settingName] !== 'undefined') ? this.state.collapsed[settingName] : false;

    return isVisible && (
      <div key={settingName} style={STYLES.setting}>
        {setting.collapsible && (<div
          style={STYLES.expander}
          onClick={() => this.toggleCollapsed({settingName, collapsed})}
          className={classnames('mc-form--group-expander', {collapsed})} />)}

        <Input
          {...setting}
          label={setting.title || settingName}
          name={settingName}
          value={value}
          isEnabled={isEnabled}
          onChange={this._onChange} />
        {
          children && !collapsed && (
            <div className="mc-form--group">
              {this._renderSettings(children, value, {isEnabled})}
            </div>
          )
        }
      </div>
    );
  }

  _renderSettings(settings, opts) {
    const {values} = this.props;
    const children = [];
    for (const settingName of Object.keys(settings)) {
      const setting = settings[settingName];
      const value = values[settingName];
      const collapsed = this.state.collapsed[settingName];
      const child = this._renderSetting({...opts, settingName, setting, value, collapsed});
      children.push(child);
    }
    return children;
  }

  render() {
    const {data} = this.props;
    return (
      <div className="mc-form">
        <div className="mc-form--group">
          {this._renderSettings(data)}
        </div>
      </div>
    );
  }
}
