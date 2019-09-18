'use strict';
import React, { useMemo } from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import OverlayBase from './OverlayBase';
import { usePreviewAnimated } from '../Animates';

function OverlayPreview(props) {
  const { style, containerStyle, containerPointerEvents, children } = props;

  const {
    maskOpacityRef,
    opacityRef,
    scaleRef,
    anchorPointXRef,
    anchorPointYRef,
    translateXRef,
    translateYRef,
    onLayout,
    onPressMask,
  } = usePreviewAnimated(props);

  const buildStyles = useMemo(() => {
    return {
      baseStyle: [
        { justifyContent: 'flex-start', alignItems: 'flex-start' },
        style,
      ],
      maskStyle: { opacity: maskOpacityRef.current },
      containerStyle: [
        containerStyle,
        {
          opacity: opacityRef.current,
          transform: [
            { translateX: translateXRef.current },
            { translateY: translateYRef.current },
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
        style={buildStyles.containerStyle}
        onLayout={onLayout}
        containerPointerEvents={containerPointerEvents}
      >
        {children}
      </Animated.View>
    </OverlayBase>
  );
}

OverlayPreview.propTypes = {
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
  type: PropTypes.oneOf(['none', 'zoomIn']),
  containerStyle: ViewPropTypes.style,
  containerPointerEvents: ViewPropTypes.pointerEvents,
  maskOpacity: PropTypes.number,
};

OverlayPreview.defaultProps = {
  ...OverlayBase.type.defaultProps,
  type: 'zoomIn',
  anchorPoint: 'topRight',
  containerPointerEvents: 'box-none',
  maskOpacity: 0.3,
};

export default React.memo(OverlayPreview);
