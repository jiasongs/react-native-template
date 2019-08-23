'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoContainer() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoContainer'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoContainer);
