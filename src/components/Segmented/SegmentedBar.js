'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';

function SegmentedBar() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {},
});

SegmentedBar.propTypes = {};

SegmentedBar.defaultProps = {};

export default React.memo(SegmentedBar);
