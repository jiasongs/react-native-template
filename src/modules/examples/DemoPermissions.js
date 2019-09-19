'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';
// import { PermissionsManager } from '../../common/manager';

function DemoPermissions() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoPermissions'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoPermissions);
