'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  Button,
  Label,
  ThemeManager,
  ThemeDark,
  ThemeLight,
  useTheme,
} from '../../components';
import { StorageManager } from '../../common/manager';

function DemoTheme() {
  const themeValue = useTheme();

  return (
    <PageContainer>
      <NavigationBar title={'DemoTheme'} insets={{ top: 4 }} />
      <Label
        style={{ alignSelf: 'center', marginVertical: 20 }}
        title={'文字大小'}
        onPress={() => {
          ThemeManager.changeFont({ multiple: 1.2 });
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
          StorageManager.save('THEME1', ThemeLight);
        }}
      />
      <Button
        style={styles.blackButton}
        title={'点击切换黑暗主题'}
        onPress={() => {
          ThemeManager.changeTheme(ThemeDark); // 异步
          StorageManager.save('THEME1', ThemeDark);
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
