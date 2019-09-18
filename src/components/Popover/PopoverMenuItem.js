'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Touchable/Button';

function PopoverMenuItem(props) {
  return <Button {...props} />;
}

const styles = StyleSheet.create({
  container: {},
});

PopoverMenuItem.propTypes = {
  ...Button.propTypes,
};

PopoverMenuItem.defaultProps = {
  type: 'clear',
};

export default React.memo(PopoverMenuItem);
