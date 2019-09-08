'use strict';
import React, { useRef, useCallback } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import {
  RefreshLayout,
  RefreshHeader,
  RefreshState,
} from 'react-native-refresh';
import { Predefine } from '../../config/predefine';

function ListHeaderLoading(props) {
  const { refreshing, onRefresh, source, enable } = props;

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
      if (Predefine.isIOS) {
        setTimeout(() => {
          lottieRef.current.play();
        }, 0);
      } else {
        lottieRef.current.play();
      }
    },
    [onRefresh],
  );

  const onEndRefreshCallBack = useCallback((state) => {
    currentState.current = state;
  }, []);

  const onIdleRefreshCallBack = useCallback((state) => {
    if (currentState.current === RefreshState.End) {
      if (Predefine.isIOS) {
        setTimeout(() => {
          lottieRef.current.reset();
        }, 0);
      } else {
        lottieRef.current.reset();
      }
    }
    currentState.current = state;
  }, []);

  const onChangeOffsetCallBack = useCallback((event) => {
    const { offset } = event.nativeEvent;

    if (
      currentState.current !== RefreshState.Refreshing &&
      currentState.current !== RefreshState.End
    ) {
      if (Predefine.isAndroid) {
      } else {
        progressRef.current.setValue(offset);
      }
    }
  }, []);

  return (
    <RefreshLayout
      refreshing={refreshing}
      onChangeOffset={onChangeOffsetCallBack}
      onPullingRefresh={onPullingRefreshCallBack}
      onRefresh={onRefreshCallBack}
      onEndRefresh={onEndRefreshCallBack}
      onIdleRefresh={onIdleRefreshCallBack}
      enable={enable}
    >
      <RefreshHeader style={styles.container}>
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
            inputRange: [0, 286],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })}
        />
      </RefreshHeader>
      {props.children}
    </RefreshLayout>
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
  enable: PropTypes.bool,
};

ListHeaderLoading.defaultProps = {
  refreshing: false,
  enable: true,
};

export default React.memo(ListHeaderLoading);
