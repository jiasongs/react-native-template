'use strict';
import React, { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import ThemeManager, { CHANGEEVENT } from './ThemeManager';
import ThemeLight from './ThemeLight';

// 初始的配置文件
const InitialTheme = ThemeLight;

// 创建上下文
const ThemeContext = React.createContext(InitialTheme);

// 最外层的主题
function ThemeProvider(props) {
  const { themeValue } = props;

  const [value, setValue] = useState({
    ...InitialTheme,
    ...themeValue,
  });

  useEffect(() => {
    const listenerName = DeviceEventEmitter.addListener(CHANGEEVENT, (data) => {
      setValue((preValue) => {
        return { ...preValue, ...data };
      });
    });
    return () => listenerName.remove();
  }, []);

  useEffect(() => {
    ThemeManager.currentTheme = value;
  }, [value]);

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
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
