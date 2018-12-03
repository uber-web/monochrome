import {primitives} from './light-theme-primitives';

export const LIGHT_THEME = {
  ...primitives,
  /* Colors */
  background: primitives.mono100,
  backgroundAlt: primitives.mono200,
  backgroundInvert: primitives.mono1000,

  controlColorPrimary: primitives.mono600,
  controlColorSecondary: primitives.mono500,
  controlColorHovered: primitives.mono900,
  controlColorActive: primitives.primary400,
  controlColorDisabled: primitives.mono400,

  textColorPrimary: primitives.mono900,
  textColorSecondary: primitives.mono600,
  textColorInvert: primitives.mono200,
  textColorDisabled: primitives.mono500,
  textColorWarning: primitives.warning400,
  textColorError: primitives.negative400,

  /* Typography */
  fontFamily: primitives.primaryFontFamily,
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
