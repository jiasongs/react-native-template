'use strict';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListRow,
  AlertManager,
  ActionManager,
} from '../../components';

function DemoAlert() {
  const onPress1 = useCallback(() => {
    AlertManager.show({
      title: '温馨提示',
      detail: '默认弹窗',
      onPress: (item) => {
        AlertManager.hide();
        console.log(item);
      },
      actions: [
        {
          title: '取消',
        },
        {
          title: '确定',
        },
      ],
    });
  }, []);

  const onPress2 = useCallback(() => {
    ActionManager.show({
      title: '温馨提示',
      onPress: (item) => {
        ActionManager.hide();
      },
      actions: [
        {
          title: 'item1',
        },
        {
          title: 'item2',
        },
        {
          title: 'item3',
        },
      ],
    });
  }, []);

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoAlert'} />
      <ListRow title={'默认弹窗'} onPress={onPress1} />
      <ListRow title={'默认ActionSheet'} onPress={onPress2} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoAlert);
