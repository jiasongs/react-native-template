'use strict';
import React, { useMemo } from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import OverlayBase from './OverlayBase';
import { usePopAnimated } from '../Animates';

function OverlayPop(props) {
  const { style, containerStyle, containerPointerEvents, children } = props;

  const {
    maskOpacityRef,
    opacityRef,
    scaleRef,
    anchorPointXRef,
    anchorPointYRef,
    onLayout,
    onPressMask,
  } = usePopAnimated(props);

  const buildStyles = useMemo(() => {
    return {
      baseStyle: [{ justifyContent: 'center', alignItems: 'center' }, style],
      maskStyle: { opacity: maskOpacityRef.current },
      containerStyle: [
        containerStyle,
        {
          opacity: opacityRef.current,
          transform: [
            {
              translateX: anchorPointXRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -1],
              }),
            },
            {
              translateY: anchorPointYRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -1],
              }),
            },
            { scale: scaleRef.current },
            { translateX: anchorPointXRef.current },
            { translateY: anchorPointYRef.current },
          ],
        },
      ],
    };
  }, [
    anchorPointXRef,
    anchorPointYRef,
    containerStyle,
    maskOpacityRef,
    opacityRef,
    scaleRef,
    style,
  ]);

  return (
    <OverlayBase
      style={buildStyles.baseStyle}
      maskStyle={buildStyles.maskStyle}
      onPressMask={onPressMask}
    >
      <Animated.View
        style={buildStyles.containerStyle}
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
  anchorPoint: PropTypes.oneOf([
    'center',
    'left',
    'leftTop',
    'leftBottom',
    'top',
    'topLeft',
    'topRight',
    'bottom',
    'bottomLeft',
    'bottomRight',
    'right',
    'rightTop',
    'rightBottom',
  ]),
  type: PropTypes.oneOf(['none', 'zoomOut', 'zoomIn']),
  containerStyle: ViewPropTypes.style,
  containerPointerEvents: ViewPropTypes.pointerEvents,
  maskOpacity: PropTypes.number,
};

OverlayPop.defaultProps = {
  ...OverlayBase.type.defaultProps,
  type: 'zoomOut',
  anchorPoint: 'center',
  containerPointerEvents: 'box-none',
  maskOpacity: 0.3,
};

export default React.memo(OverlayPop);
