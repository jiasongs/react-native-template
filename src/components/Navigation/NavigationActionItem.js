'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../Touchable';

function NavigationActionItem(props) {
  const { style, titleStyle, iconStyle, ...otherProps } = props;

  return (
    <Button
      type={'clear'}
      style={[styles.actionTouch, style]}
      iconStyle={[styles.actionImage, iconStyle]}
      titleStyle={[styles.actionTitle, titleStyle]}
      spacingIconAndTitle={4}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  actionTouch: {
    paddingHorizontal: 6,
    height: '100%',
  },
  actionTitle: {
    color: '#333',
    fontSize: 13,
  },
  actionImage: {
    width: 15,
    height: 15,
  },
});

NavigationActionItem.propTypes = {
  ...Button.propTypes,
  extraData: PropTypes.any,
};

NavigationActionItem.defaultProps = {};

export default React.memo(NavigationActionItem);
