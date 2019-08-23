'use strict';
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import { ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../config/themes';
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
  const themeValue = useContext(ThemeContext);

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
    const picker = themeValue.picker;
    return {
      style: [styles.picker, style],
      titleStyle: [picker.titleStyle, titleStyle],
    };
  }, [themeValue, style, titleStyle]);

  return (
    <WheelPicker
      style={buildStyles.style}
      data={items}
      onItemSelected={onChange}
      indicatorColor={'#dbdbdb'}
      itemTextColor={StyleSheet.flatten(buildStyles.titleStyle).color}
      itemTextSize={StyleSheet.flatten(buildStyles.titleStyle).fontSize}
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
