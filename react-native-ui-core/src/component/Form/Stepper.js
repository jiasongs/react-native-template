'use strict';
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../Touchable';
import { Input, Label } from '../Text';
import { useTheme } from '../Theme';

function Stepper(props) {
  const {
    style,
    defaultValue,
    editable,
    valueStyle,
    valueFormat,
    step,
    max,
    min,
    onChangeValue,
    subTitle,
    addTitle,
    subStyle,
    addStyle,
    subTitleStyle,
    addTitleStyle,
  } = props;

  const themeValue = useTheme('stepper');

  const inputRef = useRef();
  const [data, setData] = useState({
    type: 'click',
    value: 0,
  });

  const onPressLeft = useCallback(() => {
    inputRef.current.blur();
    setData(({ value }) => {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        const newData = { type: 'click', value: floatValue - step };
        onChangeValue && onChangeValue(newData);
        return newData;
      }
      return { type: 'click', value };
    });
  }, [onChangeValue, step]);

  const onPressRight = useCallback(() => {
    inputRef.current.blur();
    setData(({ value }) => {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        const newData = { type: 'click', value: floatValue + step };
        onChangeValue && onChangeValue(newData);
        return newData;
      }
      return { type: 'click', value };
    });
  }, [onChangeValue, step]);

  const onChangeText = useCallback(
    (text) => {
      let newValue = parseFloat(text.replace(/[^0-9]/gi, ''));
      if (isNaN(newValue)) {
        newValue = 0;
      }
      const newData = {
        type: 'input',
        value: newValue,
      };
      onChangeValue && onChangeValue(newData);
      setData(newData);
    },
    [onChangeValue],
  );

  useEffect(() => {
    setData({
      type: 'click',
      value: defaultValue,
    });
  }, [defaultValue]);

  const inputValue = useMemo(() => {
    if (valueFormat) {
      return `${valueFormat(data.value)}`;
    } else {
      return `${data.value}`;
    }
  }, [data, valueFormat]);

  const buildStyles = useMemo(() => {
    return {
      style: [themeValue.style, styles.container, style],
      valueStyle: [themeValue.valueStyle, styles.input, valueStyle],
      subStyle: [styles.leftAction, subStyle],
      addStyle: [styles.rightAction, addStyle],
      subTitleStyle: [styles.leftTitle, subTitleStyle],
      addTitleStyle: [styles.rightTitle, addTitleStyle],
    };
  }, [
    addStyle,
    addTitleStyle,
    style,
    subStyle,
    subTitleStyle,
    themeValue,
    valueStyle,
  ]);

  return (
    <View style={buildStyles.style}>
      <Button
        type={'outline'}
        style={buildStyles.subStyle}
        title={subTitle}
        titleStyle={buildStyles.subTitleStyle}
        onPress={onPressLeft}
        disabled={min !== undefined && data.value <= min}
        clickInterval={0}
      />
      <Input
        ref={inputRef}
        style={buildStyles.valueStyle}
        value={inputValue}
        onChangeText={onChangeText}
        keyboardType={'numeric'}
        editable={editable}
      />
      <Button
        type={'outline'}
        style={buildStyles.addStyle}
        title={addTitle}
        titleStyle={buildStyles.addTitleStyle}
        onPress={onPressRight}
        disabled={max !== undefined && data.value >= max}
        clickInterval={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftAction: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 35,
    height: 35,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  leftTitle: {
    fontSize: 18,
  },
  input: {
    padding: 0,
  },
  rightAction: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 35,
    height: 35,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  rightTitle: {
    fontSize: 18,
  },
});

Stepper.propTypes = {
  ...ViewPropTypes,
  defaultValue: PropTypes.number,
  step: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  valueStyle: Input.propTypes.style,
  valueFormat: PropTypes.func,
  editable: PropTypes.bool,
  onChangeValue: PropTypes.func,
  subTitle: Button.propTypes.title,
  addTitle: Button.propTypes.title,
  subStyle: ViewPropTypes.style,
  addStyle: ViewPropTypes.style,
  subTitleStyle: Label.propTypes.style,
  addTitleStyle: Label.propTypes.style,
};

Stepper.defaultProps = {
  max: 10,
  min: 1,
  defaultValue: 0,
  step: 1,
  editable: true,
  subTitle: '-',
  addTitle: '+',
};

export default React.memo(Stepper);
