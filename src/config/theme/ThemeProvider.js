'use strict';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, DeviceEventEmitter, Platform } from 'react-native';
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

  const opacityRef = useRef(new Animated.Value(1.0));
  const [value, setValue] = useState({
    ...InitialTheme,
    ...themeValue,
  });

  useEffect(() => {
    const listenerName = DeviceEventEmitter.addListener(CHANGEEVENT, (data) => {
      if (Platform.OS === 'ios') {
        // 只支持iOS，安卓效果不太好
        opacityRef.current.setValue(0.2);
        Animated.spring(opacityRef.current, {
          toValue: 1.0,
          useNativeDriver: true,
        }).start();
      }
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
      <Animated.View
        style={{
          flex: 1,
          opacity: opacityRef.current,
        }}
      >
        {props.children}
      </Animated.View>
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
