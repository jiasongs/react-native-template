'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';

function Stepper() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {},
});

Stepper.propTypes = {};

Stepper.defaultProps = {};

export default React.memo(Stepper);
