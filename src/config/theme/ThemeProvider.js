'use strict';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThemeManager from './ThemeManager';
import ThemeLight from './ThemeLight';

// 初始的配置文件
const InitialTheme = ThemeLight;

// 创建上下文
const ThemeContext = React.createContext(InitialTheme);

// 最外层的主题
function ThemeProvider(props) {
  const { themeValue, children } = props;

  const [value, setValue] = useState(InitialTheme);

  useEffect(() => {
    const listenerName = ThemeManager.addListener((data) => {
      setValue((preValue) => {
        return { ...preValue, ...data };
      });
    });
    return () => listenerName.remove();
  }, []);

  useEffect(() => {
    ThemeManager.currentTheme = value;
  }, [value]);

  useEffect(() => {
    setValue((preValue) => {
      return { ...preValue, ...themeValue };
    });
  }, [themeValue]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  themeValue: PropTypes.object,
};

ThemeProvider.defaultProps = {
  themeValue: {},
};

export { ThemeContext };

export default React.memo(ThemeProvider);
