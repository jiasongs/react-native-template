'use strict';
import React, { useMemo } from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import OverlayBase from './OverlayBase';
import { usePopAnimated } from './OverlayHook';

function OverlayPop(props) {
  const { containerStyle, containerPointerEvents, children } = props;

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
        containerStyle,
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
    containerStyle,
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
      <Animated.View
        style={buildStyles.style}
        onLayout={onLayout}
        containerPointerEvents={containerPointerEvents}
      >
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
  maskOpacity: PropTypes.number,
};

OverlayPop.defaultProps = {
  ...OverlayBase.type.defaultProps,
  type: 'zoomOut',
  animated: true,
  containerPointerEvents: 'box-none',
  maskOpacity: 0.3,
};

export default React.memo(OverlayPop);
