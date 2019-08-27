import React from 'react';
import ThemeLight from './ThemeLight';
import ThemeDark from './ThemeDark';
import { ThemeManager, useThemeValue } from '../theme/ThemeManager';

const ThemeContext = React.createContext(ThemeLight);

export { ThemeLight, ThemeDark, ThemeManager, ThemeContext, useThemeValue };
