'use strict';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ThemeManager from './ThemeManager';
import DynamicTheme from './DynamicTheme';
import { ThemeLight } from './styles';
import deepmerge from 'deepmerge';

const initialTheme = DynamicTheme(ThemeLight);

const ThemeContext = React.createContext(initialTheme);

function ThemeProvider(props) {
  const { defaultValue, children } = props;

  const defaultValueRef = useRef(defaultValue);
  const [value, setValue] = useState(deepmerge(initialTheme, defaultValue));

  const setThemeValue = useCallback((data) => {
    setValue((preValue) => {
      return DynamicTheme({ ...preValue, ...data });
    });
  }, []);

  useEffect(() => {
    const listenerName = ThemeManager.addListener((data) => {
      console.log('传进来的主题', data);
      setThemeValue({ ...defaultValueRef.current, ...data });
    });
    return () => listenerName.remove();
  }, [setThemeValue]);

  useEffect(() => {
    ThemeManager.currentTheme = value;
  }, [value]);

  useEffect(() => {
    setThemeValue(defaultValue);
    defaultValueRef.current = defaultValue;
  }, [defaultValue, setThemeValue]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  defaultValue: PropTypes.object,
};

ThemeProvider.defaultProps = {
  defaultValue: {},
};

export { ThemeContext };

export default React.memo(ThemeProvider);
