'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';

function SceneView() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {},
});

SceneView.propTypes = {};

SceneView.defaultProps = {};

export default React.memo(SceneView);
