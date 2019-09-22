'use strict';
import React, { useRef, useMemo, useCallback } from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { PanGestureHandler } from 'react-native-gesture-handler';
import OverlayBase from './OverlayBase';
import { usePullAnimated } from '../Animates';

function OverlayPull(props) {
  const {
    type,
    style,
    containerStyle,
    containerPointerEvents,
    panGestureEnabled,
    children,
  } = props;

  const {
    maskOpacityRef,
    displayRef,
    onPressMask,
    appear,
    disappear,
    opacityRef,
    translateRef,
    onLayout,
    offsetSizeRef,
  } = usePullAnimated(props);

  const onGestureEventRef = useRef(
    (function() {
      switch (type) {
        case 'left':
        case 'right':
          return Animated.event(
            [{ nativeEvent: { translationX: translateRef.current } }],
            { useNativeDriver: true },
          );

        case 'top':
        case 'bottom':
          return Animated.event(
            [{ nativeEvent: { translationY: translateRef.current } }],
            { useNativeDriver: true },
          );
        default:
          return;
      }
    })(),
  );

  const onHandlerStateChange = useCallback(
    (event) => {
      const { translationX, translationY, oldState } = event.nativeEvent;
      if (oldState === 4) {
        switch (type) {
          case 'left':
            if (translationX > 0) {
              return;
            }
            break;
          case 'right':
            if (translationX < 0) {
              return;
            }
            break;
          case 'top':
            if (translationY > 0) {
              return;
            }
            break;
          case 'bottom':
            if (translationY < 0) {
              return;
            }
            break;
          default:
            break;
        }
        const size = Math.abs(offsetSizeRef.current);
        const translation =
          type === 'left' || type === 'right'
            ? Math.abs(translationX)
            : Math.abs(translationY);
        if (translation <= size / 3) {
          displayRef.current = false;
          appear();
        } else {
          disappear();
        }
      }
    },
    [appear, disappear, displayRef, offsetSizeRef, type],
  );

  const buildStyles = useMemo(() => {
    let transform = {};
    let sideStyle = {};
    switch (type) {
      case 'top':
        sideStyle = {
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        };
        transform = {
          translateY: translateRef.current.interpolate({
            inputRange: [-1, 0],
            outputRange: [-1, 0],
            extrapolateRight: 'clamp',
          }),
        };
        break;
      case 'bottom':
        sideStyle = {
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        };
        transform = {
          translateY: translateRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
        };
        break;
      case 'left':
        sideStyle = {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        };
        transform = {
          translateX: translateRef.current.interpolate({
            inputRange: [-1, 0],
            outputRange: [-1, 0],
            extrapolateRight: 'clamp',
          }),
        };
        break;
      case 'right':
        sideStyle = {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        };
        transform = {
          translateX: translateRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
        };
        break;
      default:
        break;
    }
    return {
      baseStyle: [sideStyle, style],
      maskStyle: { opacity: maskOpacityRef.current },
      containerStyle: [
        containerStyle,
        {
          opacity: opacityRef.current,
          transform: [transform],
        },
      ],
    };
  }, [containerStyle, maskOpacityRef, opacityRef, style, translateRef, type]);

  return (
    <OverlayBase
      style={buildStyles.baseStyle}
      maskStyle={buildStyles.maskStyle}
      onPressMask={onPressMask}
    >
      <PanGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        onGestureEvent={onGestureEventRef.current}
        enabled={panGestureEnabled}
      >
        <Animated.View
          style={buildStyles.containerStyle}
          onLayout={onLayout}
          containerPointerEvents={containerPointerEvents}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </OverlayBase>
  );
}

OverlayPull.propTypes = {
  ...OverlayBase.type.propTypes,
  type: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  containerStyle: ViewPropTypes.style,
  containerPointerEvents: ViewPropTypes.pointerEvents,
  providerContentScale: PropTypes.number,
  providerContentStyle: ViewPropTypes.style,
  panGestureEnabled: PropTypes.bool,
};

OverlayPull.defaultProps = {
  ...OverlayBase.type.defaultProps,
  type: 'bottom',
  animated: true,
  panGestureEnabled: true,
  containerPointerEvents: 'auto',
};

export default React.memo(OverlayPull);
