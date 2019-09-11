'use strict';
import React, { useMemo } from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import OverlayBase from './OverlayBase';
import { usePopAnimated } from './OverlayHook';

function OverlayPop(props) {
  const { children } = props;

  const {
    maskOpacityRef,
    opacityRef,
    translateXRef,
    translateYRef,
    scaleXRef,
    scaleYRef,
    onLayout,
    onPressMask,
  } = usePopAnimated(props);

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
  type: PropTypes.oneOf(['none', 'zoomOut', 'zoomIn']),
  containerStyle: ViewPropTypes.style,
  containerPointerEvents: ViewPropTypes.pointerEvents,
};

OverlayPop.defaultProps = {
  ...OverlayBase.type.defaultProps,
  type: 'zoomOut',
  animated: true,
  containerPointerEvents: 'box-none',
};

export default React.memo(OverlayPop);
