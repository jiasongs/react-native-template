'use strict';
import React, { useMemo } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  ViewPropTypes,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

function OverlayBase(props) {
  const { style, maskStyle, maskPointerEvents, onPressMask, children } = props;

  const buildStyles = useMemo(() => {
    return {
      style: [StyleSheet.absoluteFill, style],
      maskStyle: [styles.maskStyle, maskStyle],
    };
  }, [maskStyle, style]);

  return (
    <View style={buildStyles.style} pointerEvents={maskPointerEvents}>
      <TouchableWithoutFeedback onPress={onPressMask}>
        <Animated.View
          pointerEvents={maskPointerEvents}
          style={buildStyles.maskStyle}
        />
      </TouchableWithoutFeedback>
      {children}
    </View>
  );
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

export default React.memo(OverlayBase);
