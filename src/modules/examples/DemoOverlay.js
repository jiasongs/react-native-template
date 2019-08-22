'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoOverlay() {

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoOverlay'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});

export default React.memo(DemoOverlay);