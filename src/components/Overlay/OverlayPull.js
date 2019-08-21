'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, ViewPropTypes } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import OverlayManager from './OverlayManager';
import OverlayBase from './OverlayBase';

class OverlayPull extends OverlayBase {

  constructor(props) {
    super(props);
    this.viewLayout = { x: 0, y: 0, width: 0, height: 0 };
    this.pullAnimates = {
      opacity: new Animated.Value(0),
      translation: new Animated.Value(0),
    };
  }

  get appearAfterMount() {
    return false;
  }

  get appearAnimates() {
    const animates = super.appearAnimates;
    this.pullAnimates.translation.setValue(this.offsetSize);
    this.pullAnimates.opacity.setValue(1);
    return animates.concat([
      Animated.spring(this.pullAnimates.translation, {
        toValue: 0,
        friction: 9,
        useNativeDriver: true
      })
    ]);
  }

  get disappearAnimates() {
    const animates = super.disappearAnimates;
    return animates.concat([
      Animated.spring(this.pullAnimates.translation, {
        toValue: this.offsetSize,
        friction: 9,
        useNativeDriver: true
      })
    ]);
  }

  get offsetSize() {
    const { side } = this.props;
    switch (side) {
      case 'top':
        return -this.viewLayout.height;
      case 'bottom':
        return this.viewLayout.height;
      case 'left':
        return -this.viewLayout.width;
      case 'right':
        return this.viewLayout.width;
      default:
        return 0;
    }
  }

  get rootTransformValue() {
    const { side, rootTransform } = this.props;
    if (!rootTransform || rootTransform === 'none') {
      return [];
    }
    switch (rootTransform) {
      case 'translate':
        switch (side) {
          case 'top':
            return [{ translateY: this.offsetSize }];
          case 'bottom':
            return [{ translateY: -this.offsetSize }];
          case 'left':
            return [{ translateX: this.offsetSize }];
          case 'right':
            return [{ translateX: -this.offsetSize }];
          default:
            return 0;
        }
      case 'scale':
        return [{ scaleX: 0.93 }, { scaleY: 0.93 }];
      default:
        return rootTransform;
    }
  }

  _onHandlerStateChange = (event) => {
    const { side } = this.props;
    const { translationX, translationY, state } = event.nativeEvent;
    if (state !== 5) {
      return;
    }
    switch (side) {
      case 'left':
        if (translationX > 0) {
          return;
        }
        break;
      case 'right':
        if (translationX < 0) {
          return;
        }
        break;
      case 'top':
        if (translationY > 0) {
          return;
        }
        break;
      case 'bottom':
        if (translationY < 0) {
          return;
        }
        break;
      default:
        break;
    }
    const size = Math.abs(this.offsetSize);
    const translation = (side === 'left' || side === 'right') ? Math.abs(translationX) : Math.abs(translationY);
    if (translation <= size / 3) {
      Animated.spring(this.pullAnimates.translation, {
        toValue: 0,
        friction: 9,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(this.pullAnimates.translation, {
        toValue: this.offsetSize,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        this.close();
      });
    }
  }

  _onGestureEvent = (event) => {
    const { side } = this.props;
    const { translationX, translationY, state } = event.nativeEvent;
    if (state !== 4) {
      return;
    }
    switch (side) {
      case 'left':
        if (translationX < 0) {
          this.pullAnimates.translation.setValue(translationX);
        }
        break;
      case 'right':
        if (translationX > 0) {
          this.pullAnimates.translation.setValue(translationX);
        }
        break;
      case 'top':
        if (translationY < 0) {
          this.pullAnimates.translation.setValue(translationY);
        }
        break;
      case 'bottom':
        if (translationY > 0) {
          this.pullAnimates.translation.setValue(translationY);
        }
        break;
      default:
        break;
    }
  }

  appear(animated = this.props.animated) {
    const { rootTransform } = this.props;
    if (rootTransform && rootTransform !== 'none') {
      OverlayManager.transformRoot(this.rootTransformValue, animated);
    }
    super.appear(animated);
  }

  disappear(animated = this.props.animated) {
    const { rootTransform } = this.props;
    if (rootTransform && rootTransform !== 'none') {
      OverlayManager.restoreRoot(animated);
    }
    super.disappear(animated);
  }

  buildStyle() {
    const { side } = this.props;
    let sideStyle = {};
    switch (side) {
      case 'top':
        sideStyle = { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' };
        break;
      case 'left':
        sideStyle = { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch' };
        break;
      case 'right':
        sideStyle = { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'stretch' };
        break;
      default:
        sideStyle = { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'stretch' };
    }
    return super.buildStyle().concat(sideStyle);
  }

  onLayout = (event) => {
    const { onLayout } = this.props;
    this.viewLayout = event.nativeEvent.layout;
    onLayout && onLayout(event);
    this.show();
  }

  renderContent(content = null) {
    const { side, containerStyle, children } = this.props;
    let transformStyle = {};
    switch (side) {
      case 'top':
        transformStyle = {
          transform: [{
            translateY: this.pullAnimates.translation
          }]
        };
        break;
      case 'left':
        transformStyle = {
          transform: [{
            translateX: this.pullAnimates.translation
          }]
        };
        break;
      case 'right':
        transformStyle = {
          transform: [{
            translateX: this.pullAnimates.translation
          }]
        };
        break;
      default:
        transformStyle = {
          transform: [{
            translateY: this.pullAnimates.translation
          }]
        };
    }
    const animatedStyle = {
      opacity: this.pullAnimates.opacity,
      ...transformStyle
    };
    return (
      <PanGestureHandler
        onHandlerStateChange={this._onHandlerStateChange}
        onGestureEvent={this._onGestureEvent}
        enabled={this.props.panGestureEnabled}
      >
        <Animated.View
          style={[containerStyle, animatedStyle]}
          onLayout={this.onLayout}>
          {content || children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

OverlayPull.propTypes = {
  ...OverlayBase.propTypes,
  side: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  containerStyle: ViewPropTypes.style,
  rootTransform: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'translate', 'scale']),
    PropTypes.arrayOf(PropTypes.shape({
      translateX: PropTypes.number,
      translateY: PropTypes.number,
      scaleX: PropTypes.number,
      scaleY: PropTypes.number,
    })),
  ]),
  panGestureEnabled: PropTypes.bool
};

OverlayPull.defaultProps = {
  ...OverlayBase.defaultProps,
  side: 'bottom',
  animated: true,
  rootTransform: 'none',
  panGestureEnabled: true
};

export default OverlayPull;