'use strict';
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  ViewPropTypes,
  StyleSheet,
  requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../Theme';
import { Label } from '../Text';

const RCTPicker = requireNativeComponent('RCTPicker');

function PickerIOS(props) {
  const {
    style,
    titleStyle,
    selectedIndex,
    data,
    onValueChange,
    renderLabelString,
  } = props;
  const _picherRef = useRef(null);
  const _currentIndex = useRef(0);
  const [items, setItems] = useState([]);
  const themeValue = useTheme('picker');

  const onChange = useCallback(
    (event) => {
      const { newValue, newIndex } = event.nativeEvent;
      if (onValueChange) {
        onValueChange(newValue, newIndex);
      }
      if (_picherRef.current && _currentIndex.current !== newIndex) {
        _picherRef.current.setNativeProps({
          selectedIndex: _currentIndex.current,
        });
      }
    },
    [onValueChange],
  );

  const _captureRef = useCallback((picker) => {
    _picherRef.current = picker;
  }, []);

  useEffect(() => {
    const newData = data.map((item, index) => {
      const label = renderLabelString
        ? renderLabelString(item, index)
        : item.label;
      return {
        value: item,
        label: label,
        textColor: buildStyles.textColor,
      };
    });
    setItems(newData);
  }, [buildStyles, data, renderLabelString]);

  useEffect(() => {
    _currentIndex.current = selectedIndex;
  }, [selectedIndex]);

  const buildStyles = useMemo(() => {
    const newTitleStyle = [themeValue.titleStyle, titleStyle];
    return {
      style: [styles.picker, style],
      titleStyle: newTitleStyle,
      fontSize: StyleSheet.flatten(newTitleStyle).fontSize,
      textColor: StyleSheet.flatten(newTitleStyle).color,
    };
  }, [themeValue, style, titleStyle]);

  return (
    <RCTPicker
      ref={_captureRef}
      style={buildStyles.style}
      items={items}
      selectedIndex={selectedIndex}
      onChange={onChange}
      fontSize={buildStyles.fontSize}
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
  titleStyle: Label.propTypes.style,
  selectedIndex: PropTypes.number.isRequired,
  data: PropTypes.array,
  onValueChange: PropTypes.func,
  renderLabelString: PropTypes.func,
};

PickerIOS.defaultProps = {
  selectedIndex: 0,
  data: [],
};

export default React.memo(PickerIOS);
