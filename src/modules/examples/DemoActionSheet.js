'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoActionSheet() {

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoActionSheet'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});

export default React.memo(DemoActionSheet);