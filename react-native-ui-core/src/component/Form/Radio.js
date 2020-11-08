'use strict';
import React, { useEffect, useRef, useMemo, useCallback } from 'react';
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
    title,
    spacingIconAndTitle,
    iconPosition,
    disabledOnly,
    disabled,
    disabledSolidStyle,
    disabledSolidInsideStyle,
    zoomRate,
    ...others
  } = props;

  const themeValue = useTheme('radio');
  const opacityAnimatedRef = useRef(new Animated.Value(1));
  const scaleAnimatedRef = useRef(new Animated.Value(checked ? zoomRate : 0.1));
  const duration = 100;

  const onPressCall = useCallback(() => {
    onPress && onPress();
  }, [onPress]);

  const buildStyles = useMemo(() => {
    const newSolidStyle = [themeValue.solidStyle];
    const newSolidInsideStyle = [themeValue.solidInsideStyle];
    if (disabled) {
      newSolidStyle.push(themeValue.disabledSolidStyle);
      newSolidInsideStyle.push(themeValue.disabledSolidInsideStyle);
    }
    newSolidStyle.push(styles.solidStyle);
    newSolidInsideStyle.push(styles.solidInsideStyle);
    if (title) {
      switch (iconPosition) {
        case 'top':
          newSolidStyle.push({
            marginBottom: spacingIconAndTitle,
          });
          break;
        case 'bottom':
          newSolidStyle.push({
            marginTop: spacingIconAndTitle,
          });
          break;
        case 'left':
          newSolidStyle.push({
            marginRight: spacingIconAndTitle,
          });
          break;
        case 'right':
          newSolidStyle.push({
            marginLeft: spacingIconAndTitle,
          });
          break;
        default:
          break;
      }
    }
    return {
      style: [style],
      solidStyle: [
        newSolidStyle,
        solidStyle,
        disabled ? disabledSolidStyle : null,
      ],
      solidInsideStyle: [
        newSolidInsideStyle,
        solidInsideStyle,
        disabled ? disabledSolidInsideStyle : null,
      ],
    };
  }, [
    disabled,
    disabledSolidInsideStyle,
    disabledSolidStyle,
    iconPosition,
    solidInsideStyle,
    solidStyle,
    spacingIconAndTitle,
    style,
    themeValue,
    title,
  ]);

  useEffect(() => {
    opacityAnimatedRef.current.setValue(1);
    Animated.timing(scaleAnimatedRef.current, {
      toValue: checked ? zoomRate : 0.1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      opacityAnimatedRef.current.setValue(checked ? 1 : 0);
    });
  }, [checked, zoomRate]);

  return (
    <Button
      type={'clear'}
      style={buildStyles.style}
      title={title}
      icon={
        !checkedIcon && !uncheckedIcon ? (
          <View style={buildStyles.solidStyle}>
            <Animated.View
              style={[
                buildStyles.solidInsideStyle,
                {
                  opacity: opacityAnimatedRef.current,
                  transform: [
                    {
                      scale: scaleAnimatedRef.current,
                    },
                  ],
                },
              ]}
            />
          </View>
        ) : checked ? (
          checkedIcon
        ) : (
          uncheckedIcon
        )
      }
      onPress={onPressCall}
      clickInterval={duration + 20}
      activeOpacity={1.0}
      iconPosition={iconPosition}
      disabledOnly={disabledOnly}
      disabled={disabled}
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
  disabledSolidStyle: ViewPropTypes.style,
  disabledSolidInsideStyle: ViewPropTypes.style,
  checked: PropTypes.bool,
  checkedIcon: PropTypes.number,
  uncheckedIcon: PropTypes.number,
  zoomRate: PropTypes.number,
};

Radio.defaultProps = {
  ...Button.defaultProps,
  zoomRate: 0.8,
};

export default React.memo(Radio);
