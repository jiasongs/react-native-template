'use strict';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer, Button } from '../../components';
import {
  ThemeManager,
  ThemeDark,
  ThemeLight,
  ThemeContext,
} from '../../config/theme';
import { StorageManager } from '../../common/manager';

function DemoTheme() {
  const themeValue = useContext(ThemeContext);

  return (
    <PageContainer>
      <NavigationBar title={'DemoTheme'} />
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
