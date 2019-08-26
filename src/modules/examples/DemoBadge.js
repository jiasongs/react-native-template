'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer, Badge, Button } from '../../components';

function DemoBadge() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoBadge'} />
      <Badge style={styles.badge} count={50} countStyle={{}} />
      <Badge type={'square'} style={styles.badge} count={50} countStyle={{}} />
      <Badge type={'dot'} style={styles.badge} count={50} countStyle={{}} />
      <Button style={styles.button} title={'Badge'}>
        <Badge style={styles.badge2} count={105} countStyle={{}} />
      </Button>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  badge: {
    alignSelf: 'center',
    marginTop: 20,
  },
  badge2: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default React.memo(DemoBadge);
