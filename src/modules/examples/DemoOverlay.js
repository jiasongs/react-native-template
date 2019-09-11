'use strict';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListRow,
  ActionManager,
  OverlayBase,
  OverlayPop,
  AlertManager,
  OverlayManager,
} from '../../components';
import { Predefine } from '../../config/predefine';

function DemoOverlay() {
  const w = Math.round(Predefine.screenWidth * 0.8);

  // useEffect(() => {
  //   const com = (
  //     <ScrollView
  //       contentContainerStyle={{ flexGrow: 1 }}
  //       style={{
  //         width: w,
  //         backgroundColor: '#fff',
  //         flex: 1,
  //       }}
  //     >
  //       <Text>测试</Text>
  //     </ScrollView>
  //   );
  //   ActionManager.showView(com, {
  //     type: 'right',
  //   });
  //   return () => {};
  // }, [w]);
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoOverlay'} />
      <ListRow
        title={'测试'}
        onPress={() => {
          let key1 = 0,
            key2 = 0;
          key1 = AlertManager.show({
            title: '123',
            detail: '321',
            actions: [{ title: 'asd' }],
          });
          const com = (
            <TouchableOpacity
              contentContainerStyle={{}}
              style={{
                height: 200,
                width: 375,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
              onPress={() => {
                ActionManager.hide(key1);
              }}
            >
              {[...new Array(30)].map((item, index) => {
                return <Text key={index}>测试</Text>;
              })}
            </TouchableOpacity>
          );
          key2 = ActionManager.showView(com, {});
        }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoOverlay);
