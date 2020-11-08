'use strict';
import { useContext, useMemo } from 'react';
import { ThemeContext } from '../Provider';

function useTheme(key) {
  const themeValue = useContext(ThemeContext);

  const keyValue = useMemo(() => {
    if (key) {
      if (Array.isArray(key)) {
        const newThemeValue = {};
        key.forEach((itemKey) => {
          newThemeValue[itemKey] = themeValue[itemKey];
        });
        return newThemeValue;
      }
      return themeValue[key];
    }
    return themeValue;
  }, [key, themeValue]);

  return keyValue;
}

export default useTheme;
