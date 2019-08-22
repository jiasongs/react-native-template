'use strict';
import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import { Theme } from '../../config/themes';

function LoadingHint(props) {
  const { style, loading, source } = props;

  if (!loading) {
    return null;
  }
  return (
    <View style={[styles.container, style]}>
      <LottieView
        ref={this._captureRef}
        style={styles.lottery}
        resizeMode={'cover'}
        loop={true}
        autoSize={false}
        autoPlay={true}
        source={source}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Theme.contentTop,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottery: {
    marginTop: -20,
    width: 210,
    height: 210,
  },
});

LoadingHint.propTypes = {
  ...LottieView.propTypes,
  style: ViewPropTypes.style,
  loading: PropTypes.bool
};

LoadingHint.defaultProps = {
  ...LottieView.defaultProps,
  loading: false
};

export default React.memo(LoadingHint);