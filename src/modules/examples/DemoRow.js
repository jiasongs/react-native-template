'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoRow() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoRow'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoRow);
