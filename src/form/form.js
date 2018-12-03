import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {withTheme} from '../shared/theme';
import {ExpandedIcon, CollapsedIcon} from '../shared/icons';

import Input from './input';
import {Container, Expander} from './styled-components';

const SETTING_STYLES = {
  position: 'relative'
};

class Form extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    style: PropTypes.object,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    style: {}
  };

  state = {
    collapsed: {}
  };

  _onChange = (settingName, newValue) => {
    this.props.onChange({
      [settingName]: newValue
    });
  };

  toggleCollapsed({settingName, collapsed}) {
    const newCollapsedState = {...this.state.collapsed, [settingName]: !collapsed};
    this.setState({collapsed: newCollapsedState});
  }

  /* eslint-disable complexity */
  _renderSetting({settingName, setting, value, isEnabled = true, level}) {
    const {theme, style} = this.props;
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

    if (!isVisible) {
      return null;
    }

    const collapsed =
      typeof this.state.collapsed[settingName] !== 'undefined'
        ? this.state.collapsed[settingName]
        : false;

    const input = (
      <Input
        key={settingName}
        {...setting}
        label={setting.title || settingName}
        name={settingName}
        value={value}
        theme={theme}
        style={style}
        level={level}
        isEnabled={isEnabled}
        onChange={this._onChange}
      />
    );

    if (!children) {
      return input;
    }

    return (
      <div key={settingName} style={SETTING_STYLES}>
        {setting.collapsible && (
          <Expander
            theme={theme}
            userStyle={style.expander}
            onClick={() => this.toggleCollapsed({settingName, collapsed})}
            isExpanded={!collapsed}
          >
            {collapsed
              ? style.iconCollapsed || <CollapsedIcon />
              : style.iconExpanded || <ExpandedIcon />}
          </Expander>
        )}
        {input}
        {!collapsed && this._renderSettings(children, {isEnabled, level: level + 1})}
      </div>
    );
  }
  /* eslint-enable complexity */

  _renderSettings(settings, opts = {}) {
    const {values} = this.props;
    const children = [];
    for (const settingName of Object.keys(settings)) {
      const setting = settings[settingName];
      const value = values[settingName];
      const collapsed = this.state.collapsed[settingName];
      const level = opts.level || 0;
      const child = this._renderSetting({...opts, settingName, setting, value, collapsed, level});
      children.push(child);
    }
    return children;
  }

  render() {
    const {theme, style, data} = this.props;
    return (
      <Container theme={theme} userStyle={style.wrapper}>
        {this._renderSettings(data)}
      </Container>
    );
  }
}

export default withTheme(Form);
