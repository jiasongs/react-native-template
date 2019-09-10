'use strict';
import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';

function useOverlay(props) {
  const { onPrepare, modal, onAppearCompleted, onDisappearCompleted } = props;
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
  const animatesRef = useRef({
    appearAnimates: [],
    disappearAnimates: [],
  });

  const appear = useCallback(() => {
    const appearAnimates = animatesRef.current.appearAnimates;
    if (!displayRef.current && appearAnimates.length > 0) {
      displayRef.current = true;
      const maskAnimated = maskAnimatesRef.current.appearAnimates;
      Animated.parallel(maskAnimated.concat(appearAnimates)).start(() => {
        onAppearCompleted && onAppearCompleted();
      });
    }
  }, [onAppearCompleted]);

  const disappear = useCallback(
    ({ fromMask } = {}) => {
      if (fromMask) {
        if (modal) {
          return;
        }
        if (TextInput.State.currentlyFocusedField()) {
          Keyboard.dismiss();
          return;
        }
      }
      const disappearAnimates = animatesRef.current.disappearAnimates;
      if (displayRef.current && disappearAnimates.length > 0) {
        displayRef.current = false;
        const maskAnimated = maskAnimatesRef.current.disappearAnimates;
        Animated.parallel(maskAnimated.concat(disappearAnimates)).start(() => {
          onDisappearCompleted && onDisappearCompleted();
        });
      }
    },
    [modal, onDisappearCompleted],
  );

  useEffect(() => {
    onPrepare && onPrepare(appear, disappear);
  }, [appear, disappear, onPrepare]);

  return {
    maskOpacityRef,
    appear,
    disappear,
    displayRef,
    animatesRef,
  };
}

function usePopAnimated(props) {
  const { maskOpacityRef, animatesRef, appear, disappear } = useOverlay(props);
  const opacityRef = useRef(new Animated.Value(0));
  const translateXRef = useRef(new Animated.Value(0));
  const translateYRef = useRef(new Animated.Value(0));
  const scaleXRef = useRef(new Animated.Value(1));
  const scaleYRef = useRef(new Animated.Value(1));

  const setAnimatesWithLayout = useCallback(
    (layout) => {
      if (layout) {
        const duration = 200;
        const zoomRate = 0.3;
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
        animatesRef.current = {
          appearAnimates,
          disappearAnimates,
        };
      }
    },
    [animatesRef],
  );

  return {
    opacityRef,
    translateXRef,
    translateYRef,
    scaleXRef,
    scaleYRef,
    setAnimatesWithLayout,
    maskOpacityRef,
    appear,
    disappear,
  };
}

export { usePopAnimated, useOverlay };
