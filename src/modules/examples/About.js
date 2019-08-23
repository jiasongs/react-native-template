'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer } from '../../components';

function About() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'About'} renderLeftAction={null} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(About);
