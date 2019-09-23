'use strict';
import { useContext, useMemo } from 'react';
import { ThemeContext } from './ThemeProvider';

function useTheme(key) {
  const themeValue = useContext(ThemeContext);

  const keyValue = useMemo(() => {
    return key ? themeValue[key] : themeValue;
  }, [key, themeValue]);

  return keyValue;
}

export default useTheme;
