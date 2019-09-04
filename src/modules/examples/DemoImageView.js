'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';
import { ImageView } from '../../components';

function DemoImageView() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoImageView'} />
      <ImageView
        style={{ width: 40, height: 40 }}
        source={{
          uri:
            'https://mtimg.ruanmei.com/images/subscribedetalilicon/2019/07/30/113221_318.png',
        }}
        resizeMode={'contain'}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoImageView);
