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
  const [outputData, setOutputData] = useState({
    type: 'click',
    value: defaultValue || 0,
  });

  const onPressLeft = useCallback(() => {
    Keyboard.dismiss();
    setOutputData(({ value }) => {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        const newValue = floatValue - step;
        return { value: newValue, type: 'click' };
      }
      return { value, type: 'click' };
    });
  }, [step]);

  const onPressRight = useCallback(() => {
    Keyboard.dismiss();
    setOutputData(({ value }) => {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        const newValue = floatValue + step;
        return { value: newValue, type: 'click' };
      }
      return { value, type: 'click' };
    });
  }, [step]);

  const onChangeText = useCallback((text) => {
    setOutputData({
      type: 'input',
      value: text,
    });
  }, []);

  const inputValue = useMemo(() => {
    if (outputData.type === 'click' && valueFormat) {
      return `${valueFormat(outputData.value)}`;
    } else {
      return `${outputData.value}`;
    }
  }, [outputData, valueFormat]);

  return (
    <View style={styles.container}>
      <Button
        type={'clear'}
        style={styles.leftAction}
        title={'-'}
        titleStyle={styles.leftTitle}
        onPress={onPressLeft}
        disabled={min && outputData.value <= min}
        clickInterval={0}
      />
      <TextInput
        style={styles.input}
        value={inputValue}
        placeholder={'1'}
        onChangeText={onChangeText}
        keyboardType={'numeric'}
        editable={editable}
      />
      <Button
        type={'clear'}
        style={styles.rightAction}
        title={'+'}
        titleStyle={styles.rightTitle}
        onPress={onPressRight}
        disabled={max && outputData.value >= max}
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
    borderWidth: 1,
  },
  leftAction: {
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
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  rightAction: {
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
