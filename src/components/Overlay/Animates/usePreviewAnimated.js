'use strict';
import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import useOverlay from './useOverlay';

export default function usePreviewAnimated(props) {
  const { fromLayout, toLayout, type, anchorPoint, anchorOffset } = props;
  const { maskOpacityRef, setAnimates, onPressMask } = useOverlay(props);
  const opacityRef = useRef(new Animated.Value(0));
  const anchorPointXRef = useRef(new Animated.Value(0));
  const anchorPointYRef = useRef(new Animated.Value(0));
  const translateXRef = useRef(new Animated.Value(0));
  const translateYRef = useRef(new Animated.Value(0));
  const scaleRef = useRef(new Animated.Value(1));

  const setAnimatesWithLayout = useCallback(
    (layout) => {
      if (layout) {
        let zoomRate = 0.3;
        const duration = 210;
        switch (type) {
          case 'none':
            zoomRate = 1.0;
            break;
          case 'zoomOut':
            zoomRate = 1.3;
            break;
          case 'zoomIn':
            zoomRate = 0.3;
            break;
          default:
            break;
        }
        if (toLayout) {
        }
        console.log('anchorOffset', anchorOffset);
        switch (anchorPoint) {
          case 'none':
            translateXRef.current.setValue(0);
            translateYRef.current.setValue(0);
            anchorPointXRef.current.setValue(0);
            anchorPointYRef.current.setValue(0);
            break;
          case 'left':
            if (fromLayout) {
              const _fromX = fromLayout.x + fromLayout.width + 7;
              const _fromY =
                fromLayout.y - (layout.height - fromLayout.height) / 2;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(layout.width / 2);
            anchorPointYRef.current.setValue(0);
            break;
          case 'topLeft':
            if (fromLayout) {
              const _fromX = fromLayout.x + 4;
              const _fromY = fromLayout.y + fromLayout.height + 10;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(layout.width / 2 - anchorOffset);
            anchorPointYRef.current.setValue(layout.height / 2);
            break;
          case 'leftTop':
            if (fromLayout) {
              const _fromX = fromLayout.x + fromLayout.width + 8;
              const _fromY = fromLayout.y - 5;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(layout.width / 2);
            anchorPointYRef.current.setValue(layout.height / 2 - anchorOffset);
            break;
          case 'bottomLeft':
            if (fromLayout) {
              const _fromX = fromLayout.x;
              const _fromY = fromLayout.y - layout.height - 7;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(layout.width / 2 - anchorOffset);
            anchorPointYRef.current.setValue(-layout.height / 2);
            break;
          case 'leftBottom':
            if (fromLayout) {
              const _fromX = fromLayout.x + fromLayout.width + 8;
              const _fromY =
                fromLayout.y - layout.height + fromLayout.height + 7;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(layout.width / 2);
            anchorPointYRef.current.setValue(-layout.height / 2 + anchorOffset);
            break;
          case 'top':
            if (fromLayout) {
              const _fromX =
                fromLayout.x - (layout.width - fromLayout.width) / 2;
              const _fromY = fromLayout.y + fromLayout.height + 10;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(0);
            anchorPointYRef.current.setValue(layout.height / 2);
            break;
          case 'bottom':
            if (fromLayout) {
              const _fromX =
                fromLayout.x - (layout.width - fromLayout.width) / 2;
              const _fromY = fromLayout.y - layout.height - 10;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(0);
            anchorPointYRef.current.setValue(-layout.height / 2);
            break;
          case 'right':
            if (fromLayout) {
              const _fromX = fromLayout.x - layout.width - 8;
              const _fromY =
                fromLayout.y - (layout.height - fromLayout.height) / 2;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(-layout.width / 2);
            anchorPointYRef.current.setValue(0);
            break;
          case 'topRight':
            if (fromLayout) {
              const _fromX = fromLayout.x - layout.width + fromLayout.width;
              const _fromY = fromLayout.y + fromLayout.height + 8;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(-layout.width / 2 + anchorOffset);
            anchorPointYRef.current.setValue(layout.height / 2);
            break;
          case 'rightTop':
            if (fromLayout) {
              const _fromX = fromLayout.x - layout.width - 7;
              const _fromY = fromLayout.y - 8;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(-layout.width / 2);
            anchorPointYRef.current.setValue(layout.height / 2 - anchorOffset);
            break;
          case 'bottomRight':
            if (fromLayout) {
              const _fromX = fromLayout.x - layout.width + fromLayout.width;
              const _fromY = fromLayout.y - layout.height - 8;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(-layout.width / 2 + anchorOffset);
            anchorPointYRef.current.setValue(-layout.height / 2);
            break;
          case 'rightBottom':
            if (fromLayout) {
              const _fromX = fromLayout.x - layout.width - 5;
              const _fromY =
                fromLayout.y - layout.height + fromLayout.height + 5;
              translateXRef.current.setValue(_fromX);
              translateYRef.current.setValue(_fromY);
            }
            anchorPointXRef.current.setValue(-layout.width / 2);
            anchorPointYRef.current.setValue(-layout.height / 2 + anchorOffset);
            break;
          default:
            break;
        }
        opacityRef.current.setValue(0);
        scaleRef.current.setValue(zoomRate);
        const appearAnimates = [
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
        const disappearAnimates = [
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
        setAnimates({
          appearAnimates,
          disappearAnimates,
        });
      }
    },
    [anchorOffset, anchorPoint, fromLayout, setAnimates, toLayout, type],
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
    anchorPointXRef,
    anchorPointYRef,
    translateXRef,
    translateYRef,
    onLayout,
  };
}
