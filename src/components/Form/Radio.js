'use strict';
import React, { useRef, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  View,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../Touchable';
import { useTheme } from '../Theme';

function Radio(props) {
  const {
    style,
    onPress,
    type,
    icon,
    checked,
    checkedIcon,
    uncheckedIcon,
    solidStyle,
    solidInsideStyle,
    activeOpacity,
    spacingIconAndTitle,
    ...others
  } = props;

  const themeValue = useTheme('radio');
  const scaleAnimatedRef = useRef(new Animated.Value(0));

  const onPressCall = useCallback(() => {
    Animated.timing(scaleAnimatedRef.current, {
      toValue: checked ? 0 : 0.8,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    onPress && onPress();
  }, [checked, onPress]);

  const buildStyles = useMemo(() => {
    const newSolidStyle = [
      styles.solidStyle,
      {
        marginRight: spacingIconAndTitle,
      },
    ];
    const newSolidInsideStyle = [
      {
        transform: [
          {
            scale: scaleAnimatedRef.current,
          },
        ],
      },
      styles.solidInsideStyle,
    ];
    return {
      style: [style],
      solidStyle: [themeValue.solidStyle, newSolidStyle, solidStyle],
      solidInsideStyle: [
        themeValue.solidInsideStyle,
        newSolidInsideStyle,
        solidInsideStyle,
      ],
    };
  }, [solidInsideStyle, solidStyle, spacingIconAndTitle, style, themeValue]);

  return (
    <Button
      type={'clear'}
      style={buildStyles.style}
      icon={
        !checkedIcon && !uncheckedIcon ? (
          <View style={buildStyles.solidStyle}>
            <Animated.View style={buildStyles.solidInsideStyle} />
          </View>
        ) : checked ? (
          checkedIcon
        ) : (
          uncheckedIcon
        )
      }
      onPress={onPressCall}
      clickInterval={100}
      activeOpacity={1.0}
      {...others}
    />
  );
}

const styles = StyleSheet.create({
  solidStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  solidInsideStyle: {},
});

Radio.propTypes = {
  ...Button.propTypes,
  solidStyle: ViewPropTypes.style,
  solidInsideStyle: ViewPropTypes.style,
  checked: PropTypes.bool,
  checkedIcon: PropTypes.number,
  uncheckedIcon: PropTypes.number,
};

Radio.defaultProps = {
  ...Button.defaultProps,
};

export default React.memo(Radio);
