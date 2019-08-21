'use strict';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ViewPropTypes, StyleSheet, processColor } from 'react-native';
import PropTypes from 'prop-types';
import { WheelPicker } from 'react-native-wheel-picker-android';

function PickerAndroid(props) {
  const {
    style,
    selectedIndex,
    data,
    titleFontSize,
    titleColor,
    onValueChange,
    renderLabelString
  } = props;

  const _currentIndex = useRef(0);
  const [items, setItems] = useState([]);

  const onChange = useCallback((index) => {
    if (onValueChange) {
      onValueChange(items[index], index);
    }
  }, [items, onValueChange]);

  useEffect(() => {
    const newData = data.map((item, index) => {
      return renderLabelString ? renderLabelString(item, index) : item.label;
    });
    setItems(newData);
  }, [data, renderLabelString]);

  useEffect(() => {
    _currentIndex.current = selectedIndex;
  }, [selectedIndex]);

  return (
    <WheelPicker
      style={[styles.picker, style]}
      data={items}
      onItemSelected={onChange}
      indicatorColor={'#dbdbdb'}
      itemTextColor={processColor(titleColor)}
      itemTextSize={titleFontSize}
      selectedItem={selectedIndex}
    />
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 216,
  },
});

PickerAndroid.propTypes = {
  style: ViewPropTypes.style,
  selectedIndex: PropTypes.number.isRequired,
  data: PropTypes.array,
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.number,
  onValueChange: PropTypes.func,
  renderLabelString: PropTypes.func,
};

PickerAndroid.defaultProps = {
  selectedIndex: 0,
  data: [],
  titleColor: '#333',
  titleFontSize: 14,
};

export default React.memo(PickerAndroid);