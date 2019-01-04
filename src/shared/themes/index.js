import lightPrimitives from './light-theme-primitives';
import darkPrimitives from './dark-theme-primitives';

export const LIGHT_THEME = {
  ...lightPrimitives,
  /* Colors */
  background: lightPrimitives.mono100,
  backgroundAlt: lightPrimitives.mono200,
  backgroundInvert: lightPrimitives.mono1000,

  controlColorPrimary: lightPrimitives.mono600,
  controlColorSecondary: lightPrimitives.mono500,
  controlColorHovered: lightPrimitives.mono900,
  controlColorActive: lightPrimitives.primary400,
  controlColorDisabled: lightPrimitives.mono400,

  textColorPrimary: lightPrimitives.mono900,
  textColorSecondary: lightPrimitives.mono600,
  textColorInvert: lightPrimitives.mono200,
  textColorDisabled: lightPrimitives.mono500,
  textColorWarning: lightPrimitives.warning400,
  textColorError: lightPrimitives.negative400,

  /* Typography */
  fontFamily: lightPrimitives.primaryFontFamily,
  fontSize: 12,
  fontWeight: 'normal',
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
};

export const DARK_THEME = {
  ...darkPrimitives,
  /* Colors */
  background: darkPrimitives.mono1000,
  backgroundAlt: darkPrimitives.mono800,
  backgroundInvert: darkPrimitives.mono100,

  controlColorPrimary: darkPrimitives.mono400,
  controlColorSecondary: darkPrimitives.mono500,
  controlColorHovered: darkPrimitives.mono100,
  controlColorActive: darkPrimitives.primary300,
  controlColorDisabled: darkPrimitives.mono600,

  textColorPrimary: darkPrimitives.mono100,
  textColorSecondary: darkPrimitives.mono300,
  textColorInvert: darkPrimitives.mono800,
  textColorDisabled: darkPrimitives.mono500,
  textColorWarning: darkPrimitives.warning300,
  textColorError: darkPrimitives.negative300,

  /* Typography */
  fontFamily: darkPrimitives.primaryFontFamily,
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
};
