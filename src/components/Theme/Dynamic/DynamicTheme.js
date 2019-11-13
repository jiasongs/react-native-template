'use strict';
import deepmerge from 'deepmerge';
import { ThemeStyle, Primary } from '../Styles';

// registerStyle中可能有Primary
export default function(value = {}, registerStyle = {}) {
  const { primary: _primary = {}, ...otherThemes } = value;
  const {
    primary: _registerPrimary = {},
    ...otherRegisterStyle
  } = registerStyle;
  const registerThemes = deepmerge(ThemeStyle, otherRegisterStyle);
  const registerPrimary = deepmerge(Primary, _registerPrimary);
  const primary = deepmerge(registerPrimary, _primary);
  const newThemes = { primary: primary };
  const newOtherThemes = {};
  for (const key in registerThemes) {
    const element = registerThemes[key];
    if (key !== 'primary') {
      if (typeof element === 'function') {
        newThemes[key] = element(primary);
      } else {
        newThemes[key] = element;
      }
    }
  }
  for (const key in otherThemes) {
    const element = otherThemes[key];
    if (key !== 'primary') {
      if (typeof element === 'function') {
        newOtherThemes[key] = element(primary);
      } else {
        newOtherThemes[key] = element;
      }
    }
  }
  return deepmerge(newThemes, newOtherThemes);
}
