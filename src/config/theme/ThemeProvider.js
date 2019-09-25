'use strict';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThemeManager from './ThemeManager';
import ThemeLight from './ThemeLight';
import ThemeFont from './ThemeFont';
import ThemePrimary from './ThemePrimary';

// 初始的配置文件
const InitialTheme = {
  set: function(value) {
    Object.assign(this, value);
  },
  ...ThemeLight,
  font: ThemeFont,
};

// 创建上下文
const ThemeContext = React.createContext(InitialTheme);

// 最外层的主题
function ThemeProvider(props) {
  const { themeValue, children } = props;

  const [value, setValue] = useState(InitialTheme);

  useEffect(() => {
    const listenerName = ThemeManager.addListener((data) => {
      if (data.primary) {
        ThemePrimary.set(data.primary);
      }
      setValue((preValue) => {
        if (data.font) {
          return { ...preValue, font: { ...preValue.font, ...data.font } };
        } else {
          console.log('setValue', InitialTheme);
          return { ...InitialTheme };
        }
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
