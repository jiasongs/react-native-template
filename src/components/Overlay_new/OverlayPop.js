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
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import OverlayBase from './OverlayBase';
import { useOverlay, usePopAnimated } from './OverlayHook';

function OverlayPop(props) {
  const { children } = props;

  const {
    maskOpacityRef,
    opacityRef,
    translateXRef,
    translateYRef,
    scaleXRef,
    scaleYRef,
    setAnimatesWithLayout,
    appear,
    disappear,
  } = usePopAnimated(props);

  const onPressMask = useCallback(() => {
    disappear({ fromMask: true });
  }, [disappear]);

  const onLayout = useCallback(
    (event) => {
      if (event.nativeEvent.layout) {
        setAnimatesWithLayout(event.nativeEvent.layout);
        appear();
      }
    },
    [appear, setAnimatesWithLayout],
  );

  useEffect(() => {
    return () => {
      console.log('销毁');
    };
  }, []);

  const buildStyles = useMemo(() => {
    return {
      baseStyle: [{ justifyContent: 'center', alignItems: 'center' }],
      maskStyle: { opacity: maskOpacityRef.current },
      style: [
        {
          opacity: opacityRef.current,
          transform: [
            { translateX: translateXRef.current },
            { translateY: translateYRef.current },
            { scaleX: scaleXRef.current },
            { scaleY: scaleYRef.current },
          ],
        },
      ],
    };
  }, [
    maskOpacityRef,
    opacityRef,
    scaleXRef,
    scaleYRef,
    translateXRef,
    translateYRef,
  ]);

  return (
    <OverlayBase
      style={buildStyles.baseStyle}
      maskStyle={buildStyles.maskStyle}
      onPressMask={onPressMask}
    >
      <Animated.View style={buildStyles.style} onLayout={onLayout}>
        {children}
      </Animated.View>
    </OverlayBase>
  );
}

OverlayPop.propTypes = {
  ...OverlayBase.type.propTypes,
  type: PropTypes.oneOf(['none', 'zoomOut', 'zoomIn', 'custom']),
  containerStyle: ViewPropTypes.style,
  containerPointerEvents: ViewPropTypes.pointerEvents,
  customBounds: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

OverlayPop.defaultProps = {
  ...OverlayBase.type.defaultProps,
  type: 'zoomOut',
  animated: true,
  containerPointerEvents: 'box-none',
};

export default React.memo(OverlayPop);
