'use strict';
import React from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import OverlayBase from './OverlayBase';

class OverlayPop extends OverlayBase {
  constructor(props) {
    super(props);
    this.viewLayout = { x: 0, y: 0, width: 0, height: 0 };
    this.popAnimates = {
      opacity: new Animated.Value(0),
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scaleX: new Animated.Value(1),
      scaleY: new Animated.Value(1),
    };
  }

  get appearAfterMount() {
    return false;
  }

  get appearAnimates() {
    const animates = super.appearAnimates;
    const duration = 249;
    return animates.concat([
      Animated.timing(this.popAnimates.opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.popAnimates.translateX, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.popAnimates.translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.popAnimates.scaleX, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.popAnimates.scaleY, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]);
  }

  get disappearAnimates() {
    const animates = super.disappearAnimates;
    const duration = 200;
    const ft = this.fromTransform;
    return animates.concat([
      Animated.timing(this.popAnimates.opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.popAnimates.translateX, {
        toValue: ft.translateX,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.popAnimates.translateY, {
        toValue: ft.translateY,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.popAnimates.scaleX, {
        toValue: ft.scaleX,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.popAnimates.scaleY, {
        toValue: ft.scaleY,
        duration,
        useNativeDriver: true,
      }),
    ]);
  }

  get fromBounds() {
    const { type, customBounds } = this.props;
    let bounds;
    if (type === 'custom' && !customBounds) {
      console.error(
        'OverlayPop: customBounds can not be null when type is "custom"',
      );
    }
    if (type === 'custom' && customBounds) {
      bounds = customBounds;
    } else if (type === 'none') {
      bounds = this.viewLayout;
    } else {
      const zoomRate = type === 'zoomIn' ? 0.3 : 1.2;
      const { x, y, width, height } = this.viewLayout;
      bounds = {
        x: x - (width * zoomRate - width) / 2,
        y: y - (height * zoomRate - height) / 2,
        width: width * zoomRate,
        height: height * zoomRate,
      };
    }
    return bounds;
  }

  get fromTransform() {
    const fb = this.fromBounds;
    const tb = this.viewLayout;
    const transform = {
      translateX: fb.x + fb.width / 2 - (tb.x + tb.width / 2),
      translateY: fb.y + fb.height / 2 - (tb.y + tb.height / 2),
      scaleX: fb.width / tb.width,
      scaleY: fb.height / tb.height,
    };
    return transform;
  }

  appear(animated = this.props.animated) {
    if (animated) {
      const {
        opacity,
        translateX,
        translateY,
        scaleX,
        scaleY,
      } = this.popAnimates;
      const ft = this.fromTransform;
      opacity.setValue(0);
      translateX.setValue(ft.translateX);
      translateY.setValue(ft.translateY);
      scaleX.setValue(ft.scaleX);
      scaleY.setValue(ft.scaleY);
    }
    super.appear(animated);
  }

  disappear(animated = this.props.animated) {
    super.disappear(animated);
  }

  buildStyle() {
    const contentStyle = { justifyContent: 'center', alignItems: 'center' };
    return super.buildStyle().concat(contentStyle);
  }

  onLayout = (event) => {
    const { onLayout } = this.props;
    this.viewLayout = event.nativeEvent.layout;
    onLayout && onLayout(event);
    this.show();
  };

  renderContent(content = null) {
    const { containerStyle, children } = this.props;
    const {
      opacity,
      translateX,
      translateY,
      scaleX,
      scaleY,
    } = this.popAnimates;
    const animatedStyle = {
      opacity: opacity,
      transform: [{ translateX }, { translateY }, { scaleX }, { scaleY }],
    };
    return (
      <Animated.View
        style={[containerStyle, animatedStyle]}
        pointerEvents={'box-none'}
        onLayout={this.onLayout}
      >
        {content || children}
      </Animated.View>
    );
  }
}

OverlayPop.propTypes = {
  ...OverlayBase.propTypes,
  type: PropTypes.oneOf(['none', 'zoomOut', 'zoomIn', 'custom']),
  containerStyle: ViewPropTypes.style,
  customBounds: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

OverlayPop.defaultProps = {
  ...OverlayBase.defaultProps,
  type: 'zoomOut',
  animated: true,
};

export default OverlayPop;
