'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from 'react-native-ui-core';

function DemoPicker() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoPicker'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoPicker);
