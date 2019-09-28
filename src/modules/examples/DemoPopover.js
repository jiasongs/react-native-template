'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  PopoverPreview,
  Label,
} from '../../components';
import { Images } from '../../assets';

const actions = [
  {
    title: '搜索',
    icon: Images.icon_toast_warn,
    onPress: () => {},
  },
  {
    title: '编辑',
    icon: Images.icon_toast_warn,
    onPress: () => {},
  },
  {
    title: '移除',
    icon: Images.icon_toast_warn,
    onPress: () => {},
  },
];

function DemoPopover() {
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
        <PopoverPreview
          // style={{ backgroundColor: 'red' }}
          type={'outline'}
          arrow={'bottom'}
          menuType={'horizontal'}
          menuActions={actions}
          option={{}}
          // menuChildren={<Label>123</Label>}
        >
          <Label title={'点击'} />
        </PopoverPreview>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoPopover);
