'use strict';
import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import useOverlay from './useOverlay';

export default function usePreviewAnimated(props) {
  const { fromLayout, toLayout, type, anchorPoint, anchorOffset } = props;

  const {
    animateDurationRef,
    maskOpacityRef,
    setAnimates,
    onPressMask,
  } = useOverlay(props);

  const opacityRef = useRef(new Animated.Value(0));
  const anchorPointXRef = useRef(new Animated.Value(0));
  const anchorPointYRef = useRef(new Animated.Value(0));
  const translateXRef = useRef(new Animated.Value(0));
  const translateYRef = useRef(new Animated.Value(0));
  const scaleRef = useRef(new Animated.Value(1));
  const scaleXRef = useRef(new Animated.Value(1));
  const scaleYRef = useRef(new Animated.Value(1));

  const setAnimatesWithLayout = useCallback(
    (layout) => {
      if (layout && fromLayout) {
        let appearAnimates = [];
        let disappearAnimates = [];
        if (toLayout) {
          opacityRef.current.setValue(1);
          translateXRef.current.setValue(fromLayout.x);
          translateYRef.current.setValue(fromLayout.y);
          const multipleX = toLayout.width / fromLayout.width;
          const multipleY = toLayout.height / fromLayout.height;
          const transformx = (fromLayout.width * (1 - multipleX)) / 2;
          const layoutX = toLayout.x - transformx;
          const layoutY = toLayout.y;
          const duration = 249;
          appearAnimates = [
            Animated.spring(scaleXRef.current, {
              toValue: multipleX,
              duration,
              friction: 9,
              useNativeDriver: true,
            }),
            Animated.spring(scaleYRef.current, {
              toValue: multipleY,
              duration,
              friction: 9,
              useNativeDriver: true,
            }),
            Animated.spring(translateXRef.current, {
              toValue: layoutX,
              duration,
              friction: 9,
              useNativeDriver: true,
            }),
            Animated.spring(translateYRef.current, {
              toValue: layoutY,
              duration,
              friction: 9,
              useNativeDriver: true,
            }),
          ];
          disappearAnimates = [
            Animated.spring(scaleXRef.current, {
              toValue: 1,
              duration,
              friction: 9,
              useNativeDriver: true,
            }),
            Animated.spring(scaleYRef.current, {
              toValue: 1,
              duration,
              friction: 9,
              useNativeDriver: true,
            }),
            Animated.spring(translateXRef.current, {
              toValue: fromLayout.x,
              duration,
              friction: 9,
              useNativeDriver: true,
            }),
            Animated.spring(translateYRef.current, {
              toValue: fromLayout.y,
              duration,
              friction: 9,
              useNativeDriver: true,
            }),
          ];
        } else {
          let _fromX, _fromY;
          let zoomRate = 0.3;
          switch (type) {
            case 'none':
              zoomRate = 1.0;
              break;
            case 'zoomIn':
              zoomRate = 0.3;
              break;
            default:
              break;
          }
          scaleRef.current.setValue(zoomRate);
          switch (anchorPoint) {
            case 'center':
              translateXRef.current.setValue(0);
              translateYRef.current.setValue(0);
              anchorPointXRef.current.setValue(0);
              anchorPointYRef.current.setValue(0);
              break;
            case 'left':
              _fromX = fromLayout.x + fromLayout.width;
              _fromY = fromLayout.y - (layout.height - fromLayout.height) / 2;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(layout.width / 2);
              anchorPointYRef.current.setValue(0);
              break;
            case 'topLeft':
              _fromX = fromLayout.x;
              _fromY = fromLayout.y + fromLayout.height;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(layout.width / 2 - anchorOffset);
              anchorPointYRef.current.setValue(layout.height / 2);
              break;
            case 'leftTop':
              _fromX = fromLayout.x + fromLayout.width;
              _fromY = fromLayout.y;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(layout.width / 2);
              anchorPointYRef.current.setValue(
                layout.height / 2 - anchorOffset,
              );
              break;
            case 'bottomLeft':
              _fromX = fromLayout.x;
              _fromY = fromLayout.y - layout.height;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(layout.width / 2 - anchorOffset);
              anchorPointYRef.current.setValue(-layout.height / 2);
              break;
            case 'leftBottom':
              _fromX = fromLayout.x + fromLayout.width;
              _fromY = fromLayout.y - layout.height + fromLayout.height;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(layout.width / 2);
              anchorPointYRef.current.setValue(
                -layout.height / 2 + anchorOffset,
              );
              break;
            case 'top':
              _fromX = fromLayout.x - (layout.width - fromLayout.width) / 2;
              _fromY = fromLayout.y + fromLayout.height;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(0);
              anchorPointYRef.current.setValue(layout.height / 2);
              break;
            case 'bottom':
              _fromX = fromLayout.x - (layout.width - fromLayout.width) / 2;
              _fromY = fromLayout.y - layout.height;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(0);
              anchorPointYRef.current.setValue(-layout.height / 2);
              break;
            case 'right':
              _fromX = fromLayout.x - layout.width;
              _fromY = fromLayout.y - (layout.height - fromLayout.height) / 2;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(-layout.width / 2);
              anchorPointYRef.current.setValue(0);
              break;
            case 'topRight':
              _fromX = fromLayout.x - layout.width + fromLayout.width;
              _fromY = fromLayout.y + fromLayout.height;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(
                -layout.width / 2 + anchorOffset,
              );
              anchorPointYRef.current.setValue(layout.height / 2);
              break;
            case 'rightTop':
              _fromX = fromLayout.x - layout.width;
              _fromY = fromLayout.y;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(-layout.width / 2);
              anchorPointYRef.current.setValue(
                layout.height / 2 - anchorOffset,
              );
              break;
            case 'bottomRight':
              _fromX = fromLayout.x - layout.width + fromLayout.width;
              _fromY = fromLayout.y - layout.height;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(
                -layout.width / 2 + anchorOffset,
              );
              anchorPointYRef.current.setValue(-layout.height / 2);
              break;
            case 'rightBottom':
              _fromX = fromLayout.x - layout.width;
              _fromY = fromLayout.y - layout.height + fromLayout.height;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
              anchorPointXRef.current.setValue(-layout.width / 2);
              anchorPointYRef.current.setValue(
                -layout.height / 2 + anchorOffset,
              );
              break;
            default:
              break;
          }
          const duration = animateDurationRef.current;
          appearAnimates = [
            Animated.timing(opacityRef.current, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(scaleRef.current, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }),
          ];
          disappearAnimates = [
            Animated.timing(opacityRef.current, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(scaleRef.current, {
              toValue: zoomRate,
              duration,
              useNativeDriver: true,
            }),
          ];
        }
        setAnimates({
          appearAnimates,
          disappearAnimates,
        });
      }
    },
    [
      anchorOffset,
      anchorPoint,
      animateDurationRef,
      fromLayout,
      setAnimates,
      toLayout,
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
    onPressMask,
    // [pop]
    opacityRef,
    scaleRef,
    scaleXRef,
    scaleYRef,
    anchorPointXRef,
    anchorPointYRef,
    translateXRef,
    translateYRef,
    onLayout,
  };
}
