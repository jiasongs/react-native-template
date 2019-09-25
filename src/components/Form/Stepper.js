'use strict';
import React, { useState, useCallback, useMemo } from 'react';
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
  const { defaultValue, editable, valueFormat, step, max, min } = props;
  const [data, setData] = useState({
    type: 'click',
    value: defaultValue || 0,
  });

  const onPressLeft = useCallback(() => {
    Keyboard.dismiss();
    setData(({ value }) => {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        const newValue = floatValue - step;
        return { type: 'click', value: newValue };
      }
      return { type: 'click', value };
    });
  }, [step]);

  const onPressRight = useCallback(() => {
    Keyboard.dismiss();
    setData(({ value }) => {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        const newValue = floatValue + step;
        return { type: 'click', value: newValue };
      }
      return { type: 'click', value };
    });
  }, [step]);

  const onChangeText = useCallback((text) => {
    setData({
      type: 'input',
      value: text,
    });
  }, []);

  const inputValue = useMemo(() => {
    if (data.type === 'click' && valueFormat) {
      return `${valueFormat(data.value)}`;
    } else {
      return `${data.value}`;
    }
  }, [data, valueFormat]);

  return (
    <View style={styles.container}>
      <Button
        type={'outline'}
        style={styles.leftAction}
        title={'-'}
        titleStyle={styles.leftTitle}
        onPress={onPressLeft}
        disabled={min && data.value <= min}
        clickInterval={0}
      />
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={onChangeText}
        keyboardType={'numeric'}
        editable={editable}
      />
      <Button
        type={'outline'}
        style={styles.rightAction}
        title={'+'}
        titleStyle={styles.rightTitle}
        onPress={onPressRight}
        disabled={max && data.value >= max}
        clickInterval={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftAction: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 35,
    height: 35,
  },
  leftTitle: {
    fontSize: 18,
  },
  input: {
    padding: 0,
    minWidth: 50,
    height: '100%',
    textAlign: 'center',
    paddingHorizontal: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  rightAction: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 35,
    height: 35,
  },
  rightTitle: {
    fontSize: 18,
  },
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
  editable: true,
};

export default React.memo(Stepper);
