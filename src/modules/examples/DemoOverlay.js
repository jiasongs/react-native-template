'use strict';
import React, { useEffect } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListRow,
  ActionManager,
} from '../../components';
import { Predefine } from '../../config/predefine';

function DemoOverlay() {
  const w = Math.round(Predefine.screenWidth * 0.8);
  console.log('w', w);
  useEffect(() => {
    const com = (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          width: w,
          backgroundColor: '#fff',
          flex: 1,
        }}
      >
        <Text>测试</Text>
      </ScrollView>
    );
    ActionManager.showView(com, {
      type: 'right',
    });
    return () => {};
  }, [w]);
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoOverlay'} />
      <ListRow
        title={'测试'}
        onPress={() => {
          const com = (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={{
                width: w,
                backgroundColor: '#fff',
                flex: 1,
              }}
            >
              <Text>测试</Text>
            </ScrollView>
          );
          ActionManager.showView(com, {
            type: 'right',
          });
        }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoOverlay);
