'use strict';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationBar, PageContainer, PopoverArrow } from '../../components';

function DemoPopover() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoPopover'} />
      <PopoverArrow
        arrow={'topLeft'}
        style={{ alignSelf: 'center', padding: 10 }}
      >
        <Text>123奥术大师多收到</Text>
      </PopoverArrow>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoPopover);
