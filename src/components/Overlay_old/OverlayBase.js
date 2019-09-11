'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Animated,
  View,
  Platform,
  TextInput,
  Keyboard,
  ViewPropTypes,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';

class OverlayBase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.animates = {
      opacity: new Animated.Value(0),
    };
    this.showed = false;
    this.backListener = null;
  }

  componentDidMount() {
    const { closeOnHardwareBackPress } = this.props;
    if (Platform.OS === 'android') {
      this.backListener = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (closeOnHardwareBackPress) {
            this.closePanRelease();
            return true;
          } else {
            return false;
          }
        },
      );
    }
    this.appearAfterMount && this.show();
  }

  componentWillUnmount() {
    if (this.backListener) {
      this.backListener.remove();
      this.backListener = null;
    }
  }

  get maskOpacity() {
    const { maskOpacity } = this.props;
    // const overlay = themeValue.overlay;
    if (maskOpacity) {
      return maskOpacity;
    }
    // if (overlay.maskOpacity) {
    //   return overlay.maskOpacity;
    // }
    return 0.3;
  }

  get appearAnimates() {
    const duration = 200;
    const animates = [
      Animated.timing(this.animates.opacity, {
        toValue: this.maskOpacity,
        duration,
        useNativeDriver: true,
      }),
    ];
    return animates;
  }

  get disappearAnimates() {
    const duration = 230;
    const animates = [
      Animated.timing(this.animates.opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ];
    return animates;
  }

  get appearAfterMount() {
    return true;
  }

  appear(animated = this.props.animated, additionAnimates = null) {
    const { onAppearCompleted } = this.props;
    if (animated) {
      this.animates.opacity.setValue(0);
      Animated.parallel(this.appearAnimates.concat(additionAnimates)).start(
        () => {
          onAppearCompleted && onAppearCompleted();
        },
      );
    } else {
      this.animates.opacity.setValue(this.maskOpacity);
      onAppearCompleted && onAppearCompleted();
    }
  }

  disappear(animated = this.props.animated, additionAnimates = null) {
    const { onDisappearCompleted } = this.props;
    if (animated) {
      Animated.parallel(this.disappearAnimates.concat(additionAnimates)).start(
        () => {
          if (this.maskOpacity < 0.3) {
            this.animates.opacity.removeAllListeners();
            onDisappearCompleted && onDisappearCompleted();
          }
        },
      );
      if (this.maskOpacity >= 0.3) {
        this.animates.opacity.addListener((event) => {
          if (event.value < 0.01) {
            this.animates.opacity.stopAnimation();
            this.animates.opacity.removeAllListeners();
            onDisappearCompleted && onDisappearCompleted();
          }
        });
      }
    } else {
      onDisappearCompleted && onDisappearCompleted();
    }
  }

  show(animated = this.props.animated) {
    if (!this.showed) {
      this.showed = true;
      this.appear(animated);
    }
  }

  close(animated = this.props.animated) {
    if (this.showed) {
      this.showed = false;
      this.disappear(animated);
    }
  }

  closePanRelease = () => {
    const { modal, onCloseRequest } = this.props;
    if (modal) {
      return;
    }
    if (TextInput.State.currentlyFocusedField()) {
      Keyboard.dismiss();
      return;
    }
    if (onCloseRequest) {
      onCloseRequest(this);
    } else {
      this.close();
    }
  };

  buildStyle() {
    const { style } = this.props;
    return [styles.contentContainer, style];
  }

  renderContent() {
    return this.props.children;
  }

  render() {
    const { maskPointerEvents } = this.props;
    return (
      <View
        style={[StyleSheet.absoluteFill, this.buildStyle()]}
        pointerEvents={maskPointerEvents}
      >
        <TouchableWithoutFeedback onPress={this.closePanRelease}>
          <Animated.View
            pointerEvents={maskPointerEvents}
            style={[styles.maskStyle, { opacity: this.animates.opacity }]}
          />
        </TouchableWithoutFeedback>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maskStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

OverlayBase.propTypes = {
  style: ViewPropTypes.style,
  modal: PropTypes.bool,
  animated: PropTypes.bool,
  maskOpacity: PropTypes.number,
  maskPointerEvents: ViewPropTypes.pointerEvents,
  closeOnHardwareBackPress: PropTypes.bool,
  onAppearCompleted: PropTypes.func,
  onDisappearCompleted: PropTypes.func,
  onCloseRequest: PropTypes.func,
};

OverlayBase.defaultProps = {
  modal: false,
  animated: true,
  maskPointerEvents: 'auto',
  closeOnHardwareBackPress: true,
};

export default OverlayBase;
