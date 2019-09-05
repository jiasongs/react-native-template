'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';

function WebBrowser() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {},
});

WebBrowser.propTypes = {};

WebBrowser.defaultProps = {};

export default React.memo(WebBrowser);
