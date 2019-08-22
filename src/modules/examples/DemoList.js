'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoList() {

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoList'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});

export default React.memo(DemoList);