'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoToast() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoToast'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoToast);
