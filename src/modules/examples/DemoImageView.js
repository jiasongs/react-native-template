'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from 'react-native-ui-core';
import { ImageView } from 'react-native-ui-core';
import { Images } from '../../assets';

function DemoImageView() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoImageView'} />
      <ImageView
        style={{ width: 200, height: 200 }}
        source={{
          uri:
            'https://mtimg.ruanmei.com/images/todayinhistory/2019/06/12/150426_354.jpg',
        }}
        resizeMode={'contain'}
        placeholderImage={Images.img_no_record}
        placeholderImageStyle={{}}
        errorImage={Images.img_no_nerwork}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoImageView);
