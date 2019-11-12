'use strict';
import deepmerge from 'deepmerge';
import { ThemeStyle, Primary } from '../Styles';

let prePrimary = {};

// registerStyle中可能有Primary
export default function(value = {}, registerStyle = {}) {
  const { primary: _primary = {}, ...otherThemes } = value;
  const {
    primary: _registerPrimary = {},
    ...otherRegisterStyle
  } = registerStyle;
  const registerPrimary = deepmerge(Primary, _registerPrimary);
  const registerThemes = deepmerge(ThemeStyle, otherRegisterStyle);
  const primary = deepmerge(prePrimary, deepmerge(registerPrimary, _primary));
  // 上次更新的Primary
  prePrimary = primary;
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
