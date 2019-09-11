'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListRow,
  AlertManager,
} from '../../components';

function DemoOverlay() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoOverlay'} />
      <ListRow
        title={'测试'}
        onPress={() => {
          AlertManager.show({
            title: '123',
            detail: '321',
            onPress: () => AlertManager.hide(),
            actions: [{ title: 'asd' }],
          });
        }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoOverlay);
