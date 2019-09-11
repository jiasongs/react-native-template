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
  } = props;
  const displayRef = useRef(false);
  const maskOpacityRef = useRef(new Animated.Value(0));
  const maskAnimatesRef = useRef({
    appearAnimates: [
      Animated.timing(maskOpacityRef.current, {
        toValue: 0.3,
        duration: 230,
        useNativeDriver: true,
      }),
    ],
    disappearAnimates: [
      Animated.timing(maskOpacityRef.current, {
        toValue: 0,
        duration: 230,
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
  const { type } = props;
  const { maskOpacityRef, setAnimates, onPressMask } = useOverlay(props);
  const opacityRef = useRef(new Animated.Value(0));
  const translateXRef = useRef(new Animated.Value(0));
  const translateYRef = useRef(new Animated.Value(0));
  const scaleXRef = useRef(new Animated.Value(1));
  const scaleYRef = useRef(new Animated.Value(1));

  const setAnimatesWithLayout = useCallback(
    (layout) => {
      if (layout) {
        let zoomRate = 0.3;
        const duration = 200;
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
        const bounds = {
          x: layout.x - (layout.width * zoomRate - layout.width) / 2,
          y: layout.y - (layout.height * zoomRate - layout.height) / 2,
          width: layout.width * zoomRate,
          height: layout.height * zoomRate,
        };
        const transform = {
          translateX:
            bounds.x + bounds.width / 2 - (layout.x + layout.width / 2),
          translateY:
            bounds.y + bounds.height / 2 - (layout.y + layout.height / 2),
          scaleX: bounds.width / layout.width,
          scaleY: bounds.height / layout.height,
        };
        opacityRef.current.setValue(0);
        translateXRef.current.setValue(transform.translateX);
        translateYRef.current.setValue(transform.translateY);
        scaleXRef.current.setValue(transform.scaleX);
        scaleYRef.current.setValue(transform.scaleY);
        const appearAnimates = [
          Animated.timing(opacityRef.current, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateXRef.current, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateYRef.current, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXRef.current, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(scaleYRef.current, {
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
          Animated.timing(translateXRef.current, {
            toValue: transform.translateX,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateYRef.current, {
            toValue: transform.translateY,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(scaleXRef.current, {
            toValue: transform.scaleX,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(scaleYRef.current, {
            toValue: transform.scaleY,
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
    // [pop]
    opacityRef,
    translateXRef,
    translateYRef,
    scaleXRef,
    scaleYRef,
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
            duration: 250,
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
