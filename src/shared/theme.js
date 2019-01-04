import React from 'react';
import {LIGHT_THEME, DARK_THEME} from './themes';

const ThemeContext = React.createContext(createTheme({}));
const themeCache = new Map();

export function ThemeProvider({theme, children}) {
  let resolvedTheme = themeCache.get(theme);
  if (!resolvedTheme) {
    resolvedTheme = createTheme(theme);
    themeCache.set(theme, resolvedTheme);
  }

  return <ThemeContext.Provider value={resolvedTheme}>{children}</ThemeContext.Provider>;
}

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

function createTheme(theme) {
  let base = null;

  switch (theme.extends) {
    case 'dark':
      base = DARK_THEME;
      break;

    default:
      base = LIGHT_THEME;
      break;
  }

  theme = {...base, ...theme};

  // Reset inherited styles
  theme.__reset__ = {
    font: 'initial',
    cursor: 'initial',
    pointerEvents: 'initial',

    background: theme.background,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    lineHeight: theme.lineHeight,
    color: theme.textColorPrimary,
    textAlign: 'start'
  };

  return theme;
}
