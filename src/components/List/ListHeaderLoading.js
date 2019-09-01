'use strict';
import React, { useRef, useCallback } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import { RefreshHeader, RefreshState } from 'react-native-refresh';

function ListHeaderLoading(props) {
  const { refreshing, onRefresh, source } = props;

  const lottieRef = useRef(React.createRef());
  const progressRef = useRef(new Animated.Value(1));
  const currentState = useRef(RefreshState.Idle);

  const onPullingRefreshCallBack = useCallback((state) => {
    currentState.current = state;
  }, []);

  const onRefreshCallBack = useCallback(
    (state) => {
      currentState.current = state;
      onRefresh && onRefresh(state);
      setTimeout(() => {
        lottieRef.current.play();
      }, 0);
    },
    [onRefresh],
  );

  const onEndRefreshCallBack = useCallback((state) => {
    currentState.current = state;
  }, []);

  const onIdleRefreshCallBack = useCallback((state) => {
    if (currentState.current === RefreshState.End) {
      setTimeout(() => {
        lottieRef.current.reset();
      }, 0);
    }
    currentState.current = state;
  }, []);

  const onChangeOffsetCallBack = useCallback((event) => {
    const { offset } = event.nativeEvent;
    if (
      currentState.current !== RefreshState.Refreshing &&
      currentState.current !== RefreshState.End
    ) {
      progressRef.current.setValue(offset);
    }
  }, []);

  return (
    <RefreshHeader
      style={styles.container}
      refreshing={refreshing}
      onChangeOffset={onChangeOffsetCallBack}
      onPullingRefresh={onPullingRefreshCallBack}
      onRefresh={onRefreshCallBack}
      onEndRefresh={onEndRefreshCallBack}
      onIdleRefresh={onIdleRefreshCallBack}
    >
      <LottieView
        ref={lottieRef}
        style={styles.lottery}
        resizeMode={'cover'}
        loop={true}
        autoSize={false}
        autoPlay={false}
        speed={2}
        source={source}
        hardwareAccelerationAndroid={true}
        cacheStrategy={'weak'}
        progress={progressRef.current.interpolate({
          inputRange: [0, 200],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })}
      />
      {props.children}
    </RefreshHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottery: {
    height: 70,
  },
});

ListHeaderLoading.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};

ListHeaderLoading.defaultProps = {
  refreshing: false,
};

export default React.memo(ListHeaderLoading);
