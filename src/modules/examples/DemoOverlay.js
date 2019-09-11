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
          AlertManager.show({
            title: '123',
            detail: '321',
            actions: [{ title: 'asd' }],
          });
          // const com = (
          //   <TouchableOpacity
          //     contentContainerStyle={{}}
          //     style={{
          //       height: 200,
          //       width: w,
          //       backgroundColor: '#fff',
          //       overflow: 'hidden',
          //     }}
          //     onPress={() => {
          //       ActionManager.hide();
          //     }}
          //   >
          //     {[...new Array(30)].map((item, index) => {
          //       return <Text key={index}>测试</Text>;
          //     })}
          //   </TouchableOpacity>
          // );
          // ActionManager.showView(com, {});
        }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoOverlay);
