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

const actions = [
  {
    title: '搜索',
    icon: Images.icon_toast_warn,
    onPress: () => alert('搜索'),
  },
  {
    title: '编辑',
    icon: Images.icon_toast_warn,
    onPress: () => alert('编辑'),
  },
  {
    title: '移除',
    icon: Images.icon_toast_warn,
    onPress: () => alert('移除'),
  },
];

const arrows = [
  'left',
  'leftTop',
  'leftBottom',
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'right',
  'rightTop',
  'rightBottom',
];

function DemoPopover() {
  const buttonRef = useRef(React.createRef());

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoPopover'} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          ref={buttonRef}
          style={{}}
          title={'点击'}
          onPress={() => {
            const index = Math.floor(Math.random() * 11);
            PopoverManager.showMenu({
              arrow: arrows[index],
              type: 'vertical',
              actions: actions,
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
