'use strict';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Animated, TextInput, Keyboard } from 'react-native';
import { useBackHandler } from '../../../common/hooks/HookBackHandler';

export default function useOverlay(props) {
  const {
    onPrepare,
    onPrepareCompleted,
    modal,
    onAppearCompleted,
    onDisappearCompleted,
    closeOnHardwareBackPress,
    maskOpacity,
  } = props;

  const animateDurationRef = useRef(210);
  const displayRef = useRef(false);
  const maskOpacityRef = useRef(new Animated.Value(0));
  const maskAnimatesRef = useRef({
    appearAnimates: [
      Animated.timing(maskOpacityRef.current, {
        toValue: maskOpacity,
        duration: animateDurationRef.current,
        useNativeDriver: true,
      }),
    ],
    disappearAnimates: [
      Animated.timing(maskOpacityRef.current, {
        toValue: 0,
        duration: animateDurationRef.current,
        useNativeDriver: true,
      }),
    ],
  });
  const [animates, setAnimates] = useState({
    appearAnimates: null,
    disappearAnimates: null,
  });

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

  const onPressMask = useCallback(() => {
    if (modal) {
      return;
    }
    if (TextInput.State.currentlyFocusedField()) {
      Keyboard.dismiss();
      return;
    }
    disappear();
  }, [disappear, modal]);

  useBackHandler(
    useCallback(() => {
      if (closeOnHardwareBackPress) {
        onPressMask();
        return true;
      } else {
        return false;
      }
    }, [closeOnHardwareBackPress, onPressMask]),
  );

  // 后执行
  useEffect(() => {
    const appearAnimates = animates.appearAnimates;
    const disappearAnimates = animates.disappearAnimates;
    onPrepare && onPrepare(appear, disappear);
    if (Array.isArray(appearAnimates) && Array.isArray(disappearAnimates)) {
      onPrepareCompleted && onPrepareCompleted();
    }
  }, [animates, appear, disappear, onPrepare, onPrepareCompleted]);

  return {
    maskOpacityRef,
    animateDurationRef,
    appear,
    disappear,
    displayRef,
    onPressMask,
    animates,
    setAnimates,
  };
}
