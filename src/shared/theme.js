import React from 'react';
import {theme} from './themes';

const ThemeContext = React.createContext(theme);

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

  return ThemedComponent;
}
