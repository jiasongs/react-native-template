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
    const { type } = this.props;
    this.viewLayout = { x: 0, y: 0, width: 0, height: 0 };
    this.pullAnimates = {
      opacity: new Animated.Value(0),
      translation: new Animated.Value(0), // 最终反馈的位置
    };
    switch (type) {
      case 'left':
      case 'right':
        this.onGestureEvent = Animated.event(
          [{ nativeEvent: { translationX: this.pullAnimates.translation } }],
          { useNativeDriver: true },
        );
        break;
      case 'top':
      case 'bottom':
        this.onGestureEvent = Animated.event(
          [{ nativeEvent: { translationY: this.pullAnimates.translation } }],
          { useNativeDriver: true },
        );
        break;
      default:
        break;
    }
  }

  get appearAfterMount() {
    return false;
  }

  get appearAnimates() {
    return super.appearAnimates.concat([
      Animated.spring(this.pullAnimates.translation, {
        toValue: 0,
        friction: 9,
        useNativeDriver: true,
      }),
    ]);
  }

  get disappearAnimates() {
    return super.disappearAnimates.concat([
      Animated.timing(this.pullAnimates.translation, {
        toValue: this.offsetSize,
        duration: 250,
        useNativeDriver: true,
      }),
    ]);
  }

  get offsetSize() {
    const { type } = this.props;
    switch (type) {
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
    const { type, rootTransform } = this.props;
    if (!rootTransform || rootTransform === 'none') {
      return [];
    }
    switch (rootTransform) {
      case 'translate':
        switch (type) {
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
    const { type } = this.props;
    const { translationX, translationY, oldState } = event.nativeEvent;
    if (oldState === 4) {
      switch (type) {
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
      console.log('_onHandlerStateChange', event.nativeEvent);
      const size = Math.abs(this.offsetSize);
      const translation =
        type === 'left' || type === 'right'
          ? Math.abs(translationX)
          : Math.abs(translationY);
      if (translation <= size / 3) {
        Animated.spring(this.pullAnimates.translation, {
          toValue: 0,
          friction: 9,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(this.pullAnimates.translation, {
          toValue: this.offsetSize,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          this.close();
        });
      }
    }
  };

  appear(animated = this.props.animated) {
    const { rootTransform } = this.props;
    if (rootTransform && rootTransform !== 'none') {
      OverlayManager.transformRoot(this.rootTransformValue, animated);
    }
    this.pullAnimates.translation.setValue(this.offsetSize);
    this.pullAnimates.opacity.setValue(1);
    super.appear(animated);
  }

  disappear(animated = this.props.animated) {
    const { rootTransform } = this.props;
    if (rootTransform && rootTransform !== 'none') {
      OverlayManager.restoreRoot(animated);
    }
    super.disappear(animated);
  }

  onLayout = (event) => {
    const { onLayout } = this.props;
    this.viewLayout = event.nativeEvent.layout;
    onLayout && onLayout(event);
    this.show();
  };

  buildStyle() {
    const { type } = this.props;
    let sideStyle = {};
    switch (type) {
      case 'top':
        sideStyle = {
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        };
        break;
      case 'bottom':
        sideStyle = {
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        };
        break;
      case 'left':
        sideStyle = {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        };
        break;
      case 'right':
        sideStyle = {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        };
        break;
      default:
        break;
    }
    return super.buildStyle().concat(sideStyle);
  }

  renderContent() {
    const {
      type,
      containerStyle,
      children,
      panGestureEnabled,
      containerPointerEvents,
    } = this.props;
    let translate = {};
    switch (type) {
      case 'top':
        translate = {
          translateY: this.pullAnimates.translation.interpolate({
            inputRange: [-1, 0],
            outputRange: [-1, 0],
            extrapolateRight: 'clamp',
          }),
        };
        break;
      case 'bottom':
        translate = {
          translateY: this.pullAnimates.translation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
        };
        break;
      case 'left':
        translate = {
          translateX: this.pullAnimates.translation.interpolate({
            inputRange: [-1, 0],
            outputRange: [-1, 0],
            extrapolateRight: 'clamp',
          }),
        };
        break;
      case 'right':
        translate = {
          translateX: this.pullAnimates.translation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
        };
        break;
      default:
        break;
    }
    const animatedStyle = {
      opacity: this.pullAnimates.opacity,
      transform: [translate],
    };

    return (
      <PanGestureHandler
        onHandlerStateChange={this._onHandlerStateChange}
        onGestureEvent={this.onGestureEvent}
        enabled={panGestureEnabled}
      >
        <Animated.View
          style={[containerStyle, animatedStyle]}
          onLayout={this.onLayout}
          pointerEvents={containerPointerEvents}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

OverlayPull.propTypes = {
  ...OverlayBase.propTypes,
  type: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  containerStyle: ViewPropTypes.style,
  containerPointerEvents: ViewPropTypes.pointerEvents,
  rootTransform: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'translate', 'scale']),
    PropTypes.arrayOf(
      PropTypes.shape({
        translateX: PropTypes.number,
        translateY: PropTypes.number,
        scaleX: PropTypes.number,
        scaleY: PropTypes.number,
      }),
    ),
  ]),
  panGestureEnabled: PropTypes.bool,
};

OverlayPull.defaultProps = {
  ...OverlayBase.defaultProps,
  type: 'bottom',
  animated: true,
  rootTransform: 'none',
  panGestureEnabled: true,
  containerPointerEvents: 'auto',
};

export default OverlayPull;
