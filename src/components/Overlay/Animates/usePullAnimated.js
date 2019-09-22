'use strict';
import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import useOverlay from './useOverlay';

export default function usePullAnimated(props) {
  const {
    type,
    onProviderAnimated,
    providerContentScale,
    providerContentStyle,
  } = props;
  const {
    maskOpacityRef,
    setAnimates,
    appear,
    disappear,
    onPressMask,
    displayRef,
  } = useOverlay(props);
  const opacityRef = useRef(new Animated.Value(0));
  const translateRef = useRef(new Animated.Value(0));
  const offsetSizeRef = useRef(0);

  const setAnimatesWithLayout = useCallback(
    (layout) => {
      if (layout) {
        let offsetSize = 0;
        switch (type) {
          case 'top':
            offsetSize = -layout.height;
            break;
          case 'bottom':
            offsetSize = layout.height;
            break;
          case 'left':
            offsetSize = -layout.width;
            break;
          case 'right':
            offsetSize = layout.width;
            break;
          default:
            return 0;
        }
        offsetSizeRef.current = offsetSize;
        translateRef.current.setValue(offsetSize);
        opacityRef.current.setValue(1);
        const appearAnimates = [
          Animated.spring(translateRef.current, {
            toValue: 0,
            friction: 9,
            useNativeDriver: true,
          }),
        ];
        const disappearAnimates = [
          Animated.timing(translateRef.current, {
            toValue: offsetSize,
            duration: 249,
            useNativeDriver: true,
          }),
        ];
        if (providerContentScale) {
          onProviderAnimated([
            providerContentStyle,
            {
              transform: [
                {
                  scale: translateRef.current.interpolate({
                    inputRange: [0, offsetSize],
                    outputRange: [providerContentScale, 1],
                    extrapolateLeft: 'clamp',
                  }),
                },
              ],
            },
          ]);
        }
        setAnimates({
          appearAnimates,
          disappearAnimates,
        });
      }
    },
    [
      onProviderAnimated,
      providerContentScale,
      providerContentStyle,
      setAnimates,
      type,
    ],
  );

  const onLayout = useCallback(
    (event) => {
      if (event.nativeEvent.layout) {
        setAnimatesWithLayout(event.nativeEvent.layout);
      }
    },
    [setAnimatesWithLayout],
  );

  return {
    // [base]
    maskOpacityRef,
    displayRef,
    onPressMask,
    appear,
    disappear,
    // [pull]
    opacityRef,
    translateRef,
    onLayout,
    offsetSizeRef,
  };
}
