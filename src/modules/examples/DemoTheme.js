'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer, Button } from '../../components';
import {
  ThemeManager,
  ThemeDark,
  ThemeLight,
  useTheme,
} from '../../config/theme';
import { StorageManager } from '../../common/manager';

function DemoTheme() {
  const themeValue = useTheme();

  console.log('themeValue', themeValue);

  return (
    <PageContainer>
      <NavigationBar title={'DemoTheme'} />
      {/* <Button
        title={'字体大小'}
        onPress={() => {
          ThemeManager.changeFont({ multiple: 1.5 }); // 异步
        }}
      /> */}
      <Button
        type={'outline'}
        style={[
          styles.whiteButton,
          {
            backgroundColor: themeValue.primary.color.reverse,
            borderColor: themeValue.primary.color.main,
          },
        ]}
        title={'点击切换白色主题'}
        titleStyle={{ color: themeValue.primary.color.main }}
        onPress={() => {
          ThemeManager.changeTheme({
            navigationBar: {
              style: {
                backgroundColor: 'yellow',
              },
            },
          }); // 异步
          // StorageManager.save('THEME', ThemeLight);
        }}
      />
      <Button
        style={styles.blackButton}
        title={'点击切换黑暗主题'}
        onPress={() => {
          ThemeManager.changeTheme(ThemeDark); // 异步
          // StorageManager.save('THEME', ThemeDark);
        }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  whiteButton: {
    alignSelf: 'center',
    marginTop: 40,
  },
  blackButton: {
    alignSelf: 'center',
    marginTop: 40,
  },
});

export default React.memo(DemoTheme);
