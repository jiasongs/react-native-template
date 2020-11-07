import { ThemeLight, ThemeDark } from './Styles';
import { DynamicTheme } from './Dynamic';
import { ThemeContext, ThemeProvider, ThemeManager } from './Provider';
import { useTheme } from './Util';

const Themes = {
  ThemeLight,
  ThemeDark,
};

export {
  DynamicTheme,
  Themes,
  ThemeManager,
  ThemeContext,
  ThemeProvider,
  useTheme,
};
