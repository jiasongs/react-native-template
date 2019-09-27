'use strict';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ImageView,
  Button,
  OverlayManager,
} from '../../components';
import { Images } from '../../assets';
import { Predefine } from '../../config/predefine';

function DemoOverlay() {
  const viewRef = useRef(React.createRef());

  const com = (
    <ImageView
      ref={viewRef}
      style={{ width: 200, height: 200, backgroundColor: 'green' }}
      source={{
        uri:
          'https://mtimg.ruanmei.com/images/todayinhistory/2019/06/12/150426_354.jpg',
      }}
      resizeMode={'contain'}
      placeholderImage={Images.img_no_record}
      placeholderImageStyle={{}}
      errorImage={Images.img_no_nerwork}
    />
  );

  console.log('zzz');

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoOverlay'} />
      <Button
        type={'clear'}
        onPress={() => {
          viewRef.current.measure((x, y, width, height, pageX, pageY) => {
            OverlayManager.preview(
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                {React.cloneElement(com)}
              </View>,
              {
                containerStyle: {
                  backgroundColor: 'green',
                },
                anchorPoint: 'center',
                fromLayout: { x: pageX, y: pageY, width, height },
                toLayout: {
                  x: 0,
                  y: (Predefine.screenHeight - 200) / 2,
                  width: Predefine.screenWidth,
                  height: 400,
                },
                maskOpacity: 1.0,
              },
            );
          });
        }}
      >
        {com}
      </Button>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoOverlay);
