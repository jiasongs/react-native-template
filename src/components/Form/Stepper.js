'use strict';
import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TextInput,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../Touchable';

function Stepper(props) {
  const { defaultValue, step, max, min } = props;
  const [value, setValue] = useState(defaultValue || 0);

  const onPressLeft = useCallback(() => {
    Keyboard.dismiss();
    setValue((preValue) => {
      const floatValue = parseFloat(preValue);
      if (!isNaN(floatValue)) {
        const newValue = floatValue - step;
        if (min !== undefined) {
          if (newValue >= min) {
            return newValue;
          } else {
            return min;
          }
        } else {
          return newValue;
        }
      }
      return floatValue;
    });
  }, [min, step]);

  const onPressRight = useCallback(() => {
    Keyboard.dismiss();
    setValue((preValue) => {
      const floatValue = parseFloat(preValue);
      if (!isNaN(floatValue)) {
        const newValue = floatValue + step;
        if (max !== undefined) {
          if (newValue <= max) {
            return newValue;
          } else {
            return max;
          }
        } else {
          return newValue;
        }
      }
      return floatValue;
    });
  }, [max, step]);

  const onChangeText = useCallback((text) => {
    setValue(text);
  }, []);

  return (
    <View style={styles.container}>
      <Button style={styles.leftAction} title={'-'} onPress={onPressLeft} />
      <TextInput
        style={styles.input}
        value={`${value}`}
        placeholder={'1'}
        onChangeText={onChangeText}
      />
      <Button style={styles.rightAction} title={'+'} onPress={onPressRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftAction: {},
  input: {
    padding: 0,
  },
  rightAction: {},
});

Stepper.propTypes = {
  ...ViewPropTypes,
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  step: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  valueStyle: TextInput.propTypes.style,
  valueFormat: PropTypes.func, //(value)
  subButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  addButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  showSeparator: PropTypes.bool,
  disabled: PropTypes.bool,
  editable: PropTypes.bool,
  onChange: PropTypes.func, //(value)
};

Stepper.defaultProps = {
  max: 10,
  min: 1,
  defaultValue: 0,
  step: 1,
  subButton: '－',
  addButton: '＋',
  showSeparator: true,
  disabled: false,
  editable: true,
};

export default React.memo(Stepper);
