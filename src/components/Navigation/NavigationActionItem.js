'use strict';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

function NavigationActionItem(props) {
  const { title, titleStyle, icon, iconStyle, onPress } = props;

  return (
    <TouchableOpacity style={styles.actionTouch} onPress={onPress}>
      {icon && (
        <Image
          resizeMode={'contain'}
          style={[styles.actionImage, iconStyle]}
          source={icon}
        />
      )}
      {title && <Text style={[styles.actionTitle, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionTouch: {
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  actionTitle: {
    color: '#333',
    fontSize: 16,
  },
  actionImage: {
    width: 25,
    height: 25,
  },
});

NavigationActionItem.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  titleStyle: Text.propTypes.style,
  icon: PropTypes.number,
  iconStyle: Image.propTypes.style,
  onPress: PropTypes.func,
  extraData: PropTypes.any,
};

NavigationActionItem.defaultProps = {};

export default React.memo(NavigationActionItem);
