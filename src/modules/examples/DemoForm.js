'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer, Stepper } from '../../components';

function DemoForm() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoForm（测试）'} />
      <Stepper />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoForm);
