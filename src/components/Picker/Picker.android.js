'use strict';
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Label } from '../Text';
import { useTheme } from '../Theme';
import { WheelPicker } from 'react-native-wheel-picker-android';

function PickerAndroid(props) {
  const {
    style,
    titleStyle,
    selectedIndex,
    data,
    onValueChange,
    renderLabelString,
  } = props;

  const _currentIndex = useRef(0);
  const [items, setItems] = useState([]);
  const themeValue = useTheme('picker');

  const onChange = useCallback(
    (index) => {
      if (onValueChange) {
        onValueChange(items[index], index);
      }
    },
    [items, onValueChange],
  );

  useEffect(() => {
    const newData = data.map((item, index) => {
      return renderLabelString ? renderLabelString(item, index) : item.label;
    });
    setItems(newData);
  }, [data, renderLabelString]);

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
    <WheelPicker
      style={buildStyles.style}
      data={items}
      onItemSelected={onChange}
      indicatorColor={'#dbdbdb'}
      itemTextColor={buildStyles.textColor}
      itemTextSize={buildStyles.fontSize}
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
  titleStyle: Label.propTypes.style,
  selectedIndex: PropTypes.number.isRequired,
  data: PropTypes.array,
  onValueChange: PropTypes.func,
  renderLabelString: PropTypes.func,
};

PickerAndroid.defaultProps = {
  selectedIndex: 0,
  data: [],
};

export default React.memo(PickerAndroid);
