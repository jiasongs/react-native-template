'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  Button,
  Label,
  ThemeManager,
  Themes,
  useTheme,
} from '../../components';
import { StorageManager } from '../../common/manager';

function DemoTheme(props) {
  const themeValue = useTheme();
  const isModal = props.navigation.getParam('isModal');

  return (
    <PageContainer>
      <NavigationBar
        title={'DemoTheme'}
        contentStyle={isModal ? { height: 56 } : null}
        insets={isModal ? { top: 0 } : null}
      />
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
        title={'点击切换亮色主题'}
        titleStyle={{ color: themeValue.primary.color.main }}
        onPress={() => {
          ThemeManager.changeTheme(Themes.ThemeLight); // 异步
          StorageManager.save('THEME1', Themes.ThemeLight);
        }}
      />
      <Button
        style={styles.blackButton}
        title={'点击切换暗黑主题'}
        onPress={() => {
          ThemeManager.changeTheme(Themes.ThemeDark); // 异步
          StorageManager.save('THEME1', Themes.ThemeDark);
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
