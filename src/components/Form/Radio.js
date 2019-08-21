'use strict';
import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Touchable/Button';

function Radio(props) {
  const {
    style,
    title,
    checked,
    selectIcon,
    narmalIcon
  } = props;

  return (
    <Button
      style={[styles.button, style]}
      title={title}
      icon={checked ? selectIcon : narmalIcon}
      titleStyle={styles.titleStyle}
      iconStyle={styles.iconStyle}
      iconPosition={'left'}
      clickInterval={0}
      activeOpacity={1.0}
      disabled={true}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
  titleStyle: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 10,
  },
  iconStyle: {
    width: 15,
    height: 15,
  },
});

Radio.propTypes = {
  style: ViewPropTypes.style,
  checked: PropTypes.bool,
  narmalIcon: PropTypes.number,
  selectIcon: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onPress: PropTypes.func
};

Radio.defaultProps = {

};

export default React.memo(Radio);