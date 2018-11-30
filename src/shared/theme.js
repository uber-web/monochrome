import React from 'react';

const ThemeContext = React.createContext({
  /* Colors */
  background: '#FFF',
  backgroundAlt: '#F8F8F9',
  backgroundInvert: '#000',

  controlColorPrimary: '#A6A6A5',
  controlColorHovered: '#1C1B1B',
  controlColorActive: '#11939A',
  controlColorDisabled: '#D6D6D5',

  textColorPrimary: '#1C1B1B',
  textColorSubtle: '#A6A5A5',
  textColorInvert: '#F8F8F9',
  textColorDisabled: '#D6D6D5',

  /* Typography */
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: 12,
  lineHeight: 1.5,

  /* Effects */
  transitionDuration: '300ms',
  transitionTimingFunction: 'ease',

  shadow: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',

  /* Layout */
  controlSize: 18,

  spacingTiny: 4,
  spacingSmall: 8,
  spacingNormal: 12,
  spacingLarge: 24,
  spacingHuge: 48
});

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
          {theme => <Component {...this.props} theme={theme} />}
        </ThemeContext.Consumer>
      );
    }
  }

  return ThemedComponent;
}
