'use strict';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Animated, TextInput, Keyboard } from 'react-native';
import { useBackHandler } from '../../common/hooks/HookBackHandler';

function useOverlay(props) {
  const {
    onPrepare,
    modal,
    onAppearCompleted,
    onDisappearCompleted,
    closeOnHardwareBackPress,
    maskOpacity,
  } = props;

  const displayRef = useRef(false);
  const maskOpacityRef = useRef(new Animated.Value(0));
  const maskAnimatesRef = useRef({
    appearAnimates: [
      Animated.timing(maskOpacityRef.current, {
        toValue: maskOpacity,
        duration: 210,
        useNativeDriver: true,
      }),
    ],
    disappearAnimates: [
      Animated.timing(maskOpacityRef.current, {
        toValue: 0,
        duration: 210,
        useNativeDriver: true,
      }),
    ],
  });
  const [animates, setAnimates] = useState({
    appearAnimates: null,
    disappearAnimates: null,
  });

  useBackHandler(() => {
    if (closeOnHardwareBackPress) {
      onPressMask && onPressMask();
      return true;
    } else {
      return false;
    }
  });

  function onPressMask() {
    if (modal) {
      return;
    }
    if (TextInput.State.currentlyFocusedField()) {
      Keyboard.dismiss();
      return;
    }
    disappear();
  }

  const appear = useCallback(() => {
    if (!displayRef.current) {
      displayRef.current = true;
      const maskAnimated = maskAnimatesRef.current.appearAnimates;
      Animated.parallel(maskAnimated.concat(animates.appearAnimates)).start(
        () => {
          onAppearCompleted && onAppearCompleted();
        },
      );
    }
  }, [animates, onAppearCompleted]);

  const disappear = useCallback(() => {
    if (displayRef.current) {
      displayRef.current = false;
      const maskAnimated = maskAnimatesRef.current.disappearAnimates;
      Animated.parallel(maskAnimated.concat(animates.disappearAnimates)).start(
        () => {
          onDisappearCompleted && onDisappearCompleted();
        },
      );
    }
  }, [animates, onDisappearCompleted]);

  useEffect(() => {
    const appearAnimates = animates.appearAnimates;
    const disappearAnimates = animates.disappearAnimates;
    if (Array.isArray(appearAnimates) && Array.isArray(disappearAnimates)) {
      onPrepare && onPrepare(appear, disappear);
    }
  }, [animates, appear, disappear, onPrepare]);

  return {
    maskOpacityRef,
    appear,
    disappear,
    displayRef,
    onPressMask,
    animates,
    setAnimates,
  };
}

function usePopAnimated(props) {
  const { type, anchorPoint } = props;
  const { maskOpacityRef, setAnimates, onPressMask } = useOverlay(props);
  const opacityRef = useRef(new Animated.Value(0));
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
        switch (anchorPoint) {
          case 'center':
            translateXRef.current.setValue(0);
            translateYRef.current.setValue(0);
            break;
          case 'left':
            translateXRef.current.setValue(layout.width / 2);
            translateYRef.current.setValue(0);
            break;
          case 'leftTop':
            translateXRef.current.setValue(layout.width / 2);
            translateYRef.current.setValue(layout.height / 2);
            break;
          case 'leftBottom':
            translateXRef.current.setValue(layout.width / 2);
            translateYRef.current.setValue(-layout.height / 2);
            break;
          case 'top':
            translateXRef.current.setValue(0);
            translateYRef.current.setValue(layout.height / 2);
            break;
          case 'bottom':
            translateXRef.current.setValue(0);
            translateYRef.current.setValue(-layout.height / 2);
            break;
          case 'right':
            translateXRef.current.setValue(-layout.width / 2);
            translateYRef.current.setValue(0);
            break;
          case 'rightTop':
            translateXRef.current.setValue(-layout.width / 2);
            translateYRef.current.setValue(layout.height / 2);
            break;
          case 'rightBottom':
            translateXRef.current.setValue(-layout.width / 2);
            translateYRef.current.setValue(-layout.height / 2);
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
    [anchorPoint, setAnimates, type],
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
    translateXRef,
    translateYRef,
    onLayout,
  };
}

function usePullAnimated(props) {
  const { type } = props;
  const {
    maskOpacityRef,
    setAnimates,
    appear,
    disappear,
    onPressMask,
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
        setAnimates({
          appearAnimates,
          disappearAnimates,
        });
      }
    },
    [setAnimates, type],
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
    appear,
    disappear,
    // [pull]
    opacityRef,
    translateRef,
    onLayout,
    offsetSizeRef,
  };
}

export { usePopAnimated, usePullAnimated, useOverlay };
