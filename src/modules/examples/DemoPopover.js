'use strict';
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  PopoverManager,
  Button,
} from '../../components';
import { Images } from '../../assets';

function DemoPopover() {
  const buttonRef = useRef(React.createRef());

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoPopover'} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          ref={buttonRef}
          style={{}}
          title={'点击'}
          onPress={() => {
            PopoverManager.showMenu({
              arrow: 'bottom',
              type: 'horizontal',
              actions: [
                {
                  title: 'Search',
                  icon: Images.icon_toast_warn,
                  onPress: () => alert('Search'),
                },
                {
                  title: 'Edit',
                  icon: Images.icon_toast_warn,
                  onPress: () => alert('Edit'),
                },
                {
                  title: 'Remove',
                  icon: Images.icon_toast_warn,
                  onPress: () => alert('Remove'),
                },
              ],
              option: {
                viewRef: buttonRef.current,
              },
            });
          }}
        />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoPopover);
