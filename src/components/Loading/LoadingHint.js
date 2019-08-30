'use strict';
import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

function LoadingHint(props) {
  const { style, lotteryStyle, loading, source } = props;

  if (!loading) {
    return null;
  }
  return (
    <View style={[styles.container, style]}>
      <LottieView
        style={[styles.lottery, lotteryStyle]}
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottery: {
    width: 170,
    height: 170,
  },
});

LoadingHint.propTypes = {
  ...LottieView.propTypes,
  style: ViewPropTypes.style,
  lotteryStyle: ViewPropTypes.style,
  loading: PropTypes.bool,
};

LoadingHint.defaultProps = {
  ...LottieView.defaultProps,
  loading: false,
};

export default React.memo(LoadingHint);
