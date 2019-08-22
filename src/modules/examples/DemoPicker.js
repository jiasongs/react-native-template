'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoPicker() {

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoPicker'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});

export default React.memo(DemoPicker);