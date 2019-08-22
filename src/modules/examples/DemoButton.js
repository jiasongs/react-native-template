'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function DemoButton() {

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoButton'} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});

export default React.memo(DemoButton);