'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListRow,
  AlertManager,
  ImageView,
} from '../../components';

function DemoOverlay() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoOverlay'} />
      <ListRow
        title={'测试'}
        onPress={() => {
          // AlertManager.show({
          //   title: '123',
          //   detail: '321',
          //   onPress: () => AlertManager.hide(),
          //   actions: [{ title: 'asd' }],
          // });
          AlertManager.showView(
            <ImageView
              style={{ width: 375, height: 385 }}
              maxImageWidth={375}
              source={{
                uri:
                  'https://mtimg.ruanmei.com/images/todayinhistory/2019/06/12/150426_354.jpg',
              }}
            />,
          );
        }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoOverlay);
