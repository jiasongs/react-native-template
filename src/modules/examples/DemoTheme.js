'use strict';
import React from 'react';
import { StyleSheet, Slider } from 'react-native';
import { NavigationBar, PageContainer, Button, Label } from '../../components';
import {
  ThemeManager,
  ThemeDark,
  ThemeLight,
  useTheme,
} from '../../config/theme';
import { StorageManager } from '../../common/manager';

function DemoTheme() {
  const themeValue = useTheme();

  return (
    <PageContainer>
      <NavigationBar title={'DemoTheme'} />
      <Label
        style={{ alignSelf: 'center', marginVertical: 20 }}
        title={'文字大小'}
      />
      <Slider
        style={{ marginHorizontal: 50 }}
        minimumValue={1}
        maximumValue={2}
        onSlidingComplete={(value) => {
          ThemeManager.changeFont({ multiple: value }); // 异步
        }}
      />
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
          ThemeManager.changeTheme(ThemeLight); // 异步
          StorageManager.save('THEME', ThemeLight);
        }}
      />
      <Button
        style={styles.blackButton}
        title={'点击切换黑暗主题'}
        onPress={() => {
          ThemeManager.changeTheme(ThemeDark); // 异步
          StorageManager.save('THEME', ThemeDark);
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
