'use strict';
import { useContext, useMemo } from 'react';
import { ThemeContext } from './provider/ThemeProvider';

function useTheme(key) {
  const themeValue = useContext(ThemeContext);

  const keyValue = useMemo(() => {
    if (key) {
      return themeValue[key];
    }
    return themeValue;
  }, [key, themeValue]);

  return keyValue;
}

export default useTheme;
