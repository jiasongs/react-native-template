'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListRow,
  ToastManager,
} from '../../components';

function DemoToast() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoToast'} />
      <ListRow
        title={'文字提示'}
        onPress={() => {
          ToastManager.message(
            '文字提示-文字提示-文字提示-文字提示-文字提示-文字提示-文字提示',
          );
        }}
      />
      <ListRow
        title={'成功提示'}
        onPress={() => {
          ToastManager.success('成功提示');
        }}
      />
      <ListRow
        title={'失败提示'}
        onPress={() => {
          ToastManager.fail('失败提示');
        }}
      />
      <ListRow
        title={'警告提示'}
        onPress={() => {
          ToastManager.warn('警告提示');
        }}
      />
      <ListRow
        title={'loading提示'}
        onPress={() => {
          ToastManager.loading('loading提示');
          setTimeout(() => {
            ToastManager.hide();
          }, 3000);
        }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoToast);
