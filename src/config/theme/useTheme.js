'use strict';
import { useContext, useMemo } from 'react';
import { ThemeContext } from './ThemeProvider';

function useTheme(key) {
  const themeValue = useContext(ThemeContext);

  const keyValue = useMemo(() => {
    if (key === 'navigationBar') {
      console.log('keyValue', themeValue);
    }

    if (key) {
      return { ...themeValue[key], font: { ...themeValue.font } };
    }
    return themeValue;
  }, [key, themeValue]);

  return keyValue;
}

export default useTheme;
