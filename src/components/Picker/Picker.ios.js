'use strict';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ViewPropTypes, StyleSheet, processColor, requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';

const RCTPicker = requireNativeComponent('RCTPicker');

function PickerIOS(props) {
  const {
    style,
    selectedIndex,
    data,
    titleFontSize,
    titleColor,
    onValueChange,
    renderLabelString
  } = props;
  const _picherRef = useRef(null);
  const _currentIndex = useRef(0);
  const [items, setItems] = useState([]);

  const onChange = useCallback((event) => {
    console.log('event', event);
    const { newValue, newIndex } = event.nativeEvent;
    if (onValueChange) {
      onValueChange(newValue, newIndex);
    }
    if (_picherRef.current && _currentIndex.current !== newIndex) {
      _picherRef.current.setNativeProps({
        selectedIndex: _currentIndex.current,
      });
    }
  }, [onValueChange]);

  const _captureRef = useCallback((picker) => {
    _picherRef.current = picker;
  }, []);

  useEffect(() => {
    const newData = data.map((item, index) => {
      const label = renderLabelString ? renderLabelString(item, index) : item.label;
      return {
        value: item,
        label: label,
        textColor: processColor(titleColor),
      };
    });
    setItems(newData);
  }, [data, renderLabelString, titleColor]);

  useEffect(() => {
    _currentIndex.current = selectedIndex;
  }, [selectedIndex]);

  return (
    <RCTPicker
      ref={_captureRef}
      style={[styles.picker, style]}
      items={items}
      selectedIndex={selectedIndex}
      onChange={onChange}
      fontSize={titleFontSize}
      onStartShouldSetResponder={() => true}
      onResponderTerminationRequest={() => false}
    />
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 216,
  },
});

PickerIOS.propTypes = {
  style: ViewPropTypes.style,
  selectedIndex: PropTypes.number.isRequired,
  data: PropTypes.array,
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.number,
  onValueChange: PropTypes.func,
  renderLabelString: PropTypes.func,
};

PickerIOS.defaultProps = {
  selectedIndex: 0,
  data: [],
  titleColor: '#333',
  titleFontSize: 14,
};

export default React.memo(PickerIOS);