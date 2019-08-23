'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer, Button } from '../../components';
import { ThemeManager, ThemeWhite, ThemeBlack } from '../../config/themes';

function DemoTheme() {

  return (
    <PageContainer >
      <NavigationBar title={'DemoTheme'} />
      <Button
        style={styles.whiteButton}
        title={'点击切换白色主题'}
        onPress={() => ThemeManager.changeTheme(ThemeWhite)}
      />
      <Button
        style={styles.blackButton}
        title={'点击切换黑暗主题'}
        onPress={() => ThemeManager.changeTheme(ThemeBlack)}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  whiteButton: {

  },
  blackButton: {

  },
});

export default React.memo(DemoTheme);