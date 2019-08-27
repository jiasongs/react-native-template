'use strict';
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {
  ViewPropTypes,
  Text,
  StyleSheet,
  requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../config/theme';

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
  const themeValue = useContext(ThemeContext);

  const onChange = useCallback(
    (event) => {
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
        textColor: StyleSheet.flatten(buildStyles.titleStyle).color,
      };
    });
    setItems(newData);
  }, [themeValue, data, renderLabelString, buildStyles]);

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
    <RCTPicker
      ref={_captureRef}
      style={buildStyles.style}
      items={items}
      selectedIndex={selectedIndex}
      onChange={onChange}
      fontSize={StyleSheet.flatten(buildStyles.titleStyle).fontSize}
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
  titleStyle: Text.propTypes.style,
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
