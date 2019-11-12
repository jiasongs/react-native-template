'use strict';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import deepmerge from 'deepmerge';
import ThemeManager from './ThemeManager';
import { DynamicTheme } from '../Dynamic';
import { ThemeLight } from '../Styles';

// 初始化系统默认主题
const initialTheme = DynamicTheme(ThemeLight);

const ThemeContext = React.createContext(initialTheme);

// 主题优先级
// 1、用户改变的主题，changeTheme
// 2、用户设置的默认主题，defaultTheme
// 3、默认主题

// 流程
// ---------
// 先初始化系统默认主题（动态转换之后） 优先级3
// ---------
// 合并系统默认主题 与 用户设置的默认主题（必须进行动态转换），优先级2
// [x] 不进行动态转换的话，假设用户的默认主题设置了primary，那么其他样式还是停留在之前primary的样式
// [√] 进行动态转换，假设用户的默认主题设置了primary，其他样式会替换成新的primary，假设没有设置primary，就拿之前设置的prePrimary
// ---------
// 用户改变的主题可覆盖 合并之后的主题或之前的主题，优先级1

function ThemeProvider(props) {
  const { defaultTheme, registerStyle, children } = props;

  // 初始化系统默认主题
  const [value, setValue] = useState(initialTheme);

  useEffect(() => {
    const listenerName = ThemeManager.addListener((themes) => {
      setValue((preValue) => {
        return deepmerge(preValue, DynamicTheme(themes, registerStyle));
      });
    });
    return () => listenerName.remove();
  }, [registerStyle]);

  useEffect(() => {
    ThemeManager.currentTheme = value;
  }, [value]);

  useEffect(() => {
    setValue((preValue) => {
      return deepmerge(preValue, DynamicTheme(defaultTheme, registerStyle));
    });
  }, [defaultTheme, registerStyle]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  defaultTheme: PropTypes.object,
  registerStyle: PropTypes.object,
};

ThemeProvider.defaultProps = {
  defaultTheme: {},
  registerStyle: {},
};

export { ThemeContext };

export default React.memo(ThemeProvider);
