'use strict';
import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import useOverlay from './useOverlay';

export default function usePopAnimated(props) {
  const { type, anchorPoint } = props;

  const {
    animateDurationRef,
    maskOpacityRef,
    setAnimates,
    onPressMask,
    displayRef,
  } = useOverlay(props);

  const opacityRef = useRef(new Animated.Value(0));
  const anchorPointXRef = useRef(new Animated.Value(0));
  const anchorPointYRef = useRef(new Animated.Value(0));
  const scaleRef = useRef(new Animated.Value(1));

  const setAnimatesWithLayout = useCallback(
    (layout) => {
      if (layout) {
        let zoomRate = 0.3;
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
        switch (anchorPoint) {
          case 'center':
            anchorPointXRef.current.setValue(0);
            anchorPointYRef.current.setValue(0);
            break;
          case 'left':
            anchorPointXRef.current.setValue(layout.width / 2);
            anchorPointYRef.current.setValue(0);
            break;
          case 'topLeft':
          case 'leftTop':
            anchorPointXRef.current.setValue(layout.width / 2);
            anchorPointYRef.current.setValue(layout.height / 2);
            break;
          case 'bottomLeft':
          case 'leftBottom':
            anchorPointXRef.current.setValue(layout.width / 2);
            anchorPointYRef.current.setValue(-layout.height / 2);
            break;
          case 'top':
            anchorPointXRef.current.setValue(0);
            anchorPointYRef.current.setValue(layout.height / 2);
            break;
          case 'bottom':
            anchorPointXRef.current.setValue(0);
            anchorPointYRef.current.setValue(-layout.height / 2);
            break;
          case 'right':
            anchorPointXRef.current.setValue(-layout.width / 2);
            anchorPointYRef.current.setValue(0);
            break;
          case 'topRight':
          case 'rightTop':
            anchorPointXRef.current.setValue(-layout.width / 2);
            anchorPointYRef.current.setValue(layout.height / 2);
            break;
          case 'bottomRight':
          case 'rightBottom':
            anchorPointXRef.current.setValue(-layout.width / 2);
            anchorPointYRef.current.setValue(-layout.height / 2);
            break;
          default:
            break;
        }
        if (!displayRef.current) {
          // 未显示初始化
          opacityRef.current.setValue(0);
          scaleRef.current.setValue(zoomRate);
        }
        const duration = animateDurationRef.current;
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
    [anchorPoint, animateDurationRef, displayRef, setAnimates, type],
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
    onLayout,
  };
}
