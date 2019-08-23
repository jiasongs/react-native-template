'use strict';
import React, { useState, useCallback } from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Touchable/Button';

function Checkbox(props) {
  const {
    style,
    title,
    checked,
    defaultChecked,
    selectIcon,
    narmalIcon,
    onPress,
  } = props;
  const [checkState, setCheckState] = useState(defaultChecked);

  const _onPress = useCallback(() => {
    let newChecked = false;
    if (checked === undefined) {
      newChecked = !checkState;
      setCheckState(newChecked);
    }
    onPress && onPress(newChecked);
  }, [checkState, checked, onPress]);

  const newChecked = checked === undefined ? checkState : checked;
  const icon = newChecked ? selectIcon : narmalIcon;
  return (
    <Button
      style={[styles.button, style]}
      title={title}
      icon={icon}
      titleStyle={styles.titleStyle}
      iconStyle={styles.iconStyle}
      onPress={_onPress}
      iconPosition={'left'}
      clickInterval={0}
      activeOpacity={1.0}
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

Checkbox.propTypes = {
  style: ViewPropTypes.style,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  narmalIcon: PropTypes.number,
  selectIcon: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onPress: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: undefined,
  defaultChecked: false,
};

export default React.memo(Checkbox);
