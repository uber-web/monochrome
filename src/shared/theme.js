import React from 'react';
import {LIGHT_THEME} from './themes';

const ThemeContext = React.createContext(createTheme(LIGHT_THEME));

export const ThemeProvider = ThemeContext.Provider;

export function evaluateStyle(userStyle, props) {
  if (!userStyle) {
    return null;
  }
  if (typeof userStyle === 'function') {
    return userStyle(props);
  }
  return userStyle;
}

export function withTheme(Component) {
  class ThemedComponent extends React.Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {_theme => <Component {...this.props} theme={_theme} />}
        </ThemeContext.Consumer>
      );
    }
  }

  ThemedComponent.propTypes = Component.propTypes;
  ThemedComponent.defaultProps = Component.defaultProps;

  return ThemedComponent;
}

export function createTheme(theme) {
  // Reset inherited styles
  const __reset__ = {
    font: 'initial',
    cursor: 'initial',
    pointerEvents: 'initial',

    background: theme.background,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    color: theme.textColorPrimary,
  };

  return {...theme, __reset__};
}
