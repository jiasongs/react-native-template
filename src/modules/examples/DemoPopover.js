'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  PopoverArrow,
  AlertManager,
  ListRow,
  ImageView,
} from '../../components';
import { Predefine } from '../../config/predefine';

function DemoPopover() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar
        title={'DemoPopover'}
        renderRightAction={[
          {
            title: '点击',
            onPress: () => {
              AlertManager.showView(
                <PopoverArrow arrow={'topRight'}>
                  <Text>123奥术大师多收到asdasd </Text>
                </PopoverArrow>,
                {
                  type: 'zoomIn',
                  containerStyle: {
                    position: 'absolute',
                    right: 20,
                    top: 64,
                  },
                  style: {},
                  anchorPoint: 'rightTop',
                },
              );
            },
          },
        ]}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoPopover);
