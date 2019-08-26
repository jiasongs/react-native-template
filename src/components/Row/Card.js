'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';

function Card() {
  console.warn('card');
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {},
});

Card.propTypes = {};

Card.defaultProps = {};

export default React.memo(Card);
