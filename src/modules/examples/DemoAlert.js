'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoAlert() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoAlert'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoAlert);
