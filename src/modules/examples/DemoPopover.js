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

function DemoPopover() {
  const buttonRef = useRef(React.createRef());
  const buttonRef2 = useRef(React.createRef());
  const buttonRef3 = useRef(React.createRef());
  const buttonRef4 = useRef(React.createRef());

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
          ref={buttonRef3}
          style={{}}
          title={'点击'}
          onPress={() => {
            PopoverManager.showMenu({
              arrow: 'topRight',
              type: 'vertical',
              actions: actions,
              option: {
                viewRef: buttonRef3.current,
              },
            });
          }}
        />
        <View>
          <Button
            ref={buttonRef}
            style={{}}
            title={'点击（水平）'}
            onPress={() => {
              PopoverManager.showMenu({
                arrow: 'bottom',
                type: 'horizontal',
                actions: actions,
                option: {
                  viewRef: buttonRef.current,
                },
              });
            }}
          />
          <Button
            ref={buttonRef2}
            style={{ marginTop: 20 }}
            title={'点击（垂直）'}
            onPress={() => {
              PopoverManager.showMenu({
                arrow: 'top',
                type: 'vertical',
                actions: actions,
                option: {
                  viewRef: buttonRef2.current,
                },
              });
            }}
          />
        </View>
        <Button
          ref={buttonRef4}
          style={{}}
          title={'点击'}
          onPress={() => {
            PopoverManager.showMenu({
              arrow: 'bottomLeft',
              type: 'vertical',
              actions: actions,
              option: {
                viewRef: buttonRef4.current,
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
