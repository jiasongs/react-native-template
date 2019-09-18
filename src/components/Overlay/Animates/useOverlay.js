'use strict';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Animated, TextInput, Keyboard } from 'react-native';
import { useBackHandler } from '../../../common/hooks/HookBackHandler';

export default function useOverlay(props) {
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
