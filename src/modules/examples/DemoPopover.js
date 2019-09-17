'use strict';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  PopoverArrow,
  AlertManager,
} from '../../components';

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
                  containerStyle: { marginRight: 20, marginTop: 64 },
                  style: {
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                  },
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
