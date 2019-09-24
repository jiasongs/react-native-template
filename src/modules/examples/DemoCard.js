'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';
import { Card } from '../../components';

function DemoCard() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoCard（测试）'} />
      <Card />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoCard);
