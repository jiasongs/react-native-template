'use strict';
import React, { useRef, useEffect, useMemo } from 'react';
import { View, StyleSheet, Animated, Image, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../Theme';
import { Label } from '../Text';
import { RenderNode } from '../Helpers';

function RenderIcon(props) {
  const {
    type,
    iconStyle,
    rotateAnimated,
    successIcon,
    failIcon,
    warnIcon,
    loadingIcon,
  } = props;
  let source;
  if (type === 'message') {
    source = null;
  } else if (type === 'success') {
    source = successIcon;
  } else if (type === 'fail') {
    source = failIcon;
  } else if (type === 'warn') {
    source = warnIcon;
  } else if (type === 'loading') {
    source = loadingIcon;
  } else {
    source = null;
  }
  const rotate = rotateAnimated.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  if (source) {
    return (
      <Animated.Image
        style={[iconStyle, { transform: [{ rotate }] }]}
        resizeMode={'contain'}
        source={source}
      />
    );
  }
  return null;
}

const MemoRenderIcon = React.memo(RenderIcon);

function ToastView(props) {
  const {
    style,
    type,
    title,
    titleStyle,
    iconStyle,
    successIcon,
    failIcon,
    warnIcon,
    loadingIcon,
  } = props;

  const themeValue = useTheme('toast');
  const rotateAnimatedRef = useRef(new Animated.Value(0));
  const loopAnimatedRef = useRef(null);

  useEffect(() => {
    type === 'loading' && startRotateAnimated();
    return () => {
      type === 'loading' && stopRotateAnimated();
    };
  }, [type]);

  function startRotateAnimated() {
    const timingAnimated = Animated.timing(rotateAnimatedRef.current, {
      toValue: 3600,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    loopAnimatedRef.current = Animated.loop(timingAnimated, { iterations: -1 });
    loopAnimatedRef.current.start(() => {});
  }

  function stopRotateAnimated() {
    loopAnimatedRef.current.stop();
    rotateAnimatedRef.current.stopAnimation();
    loopAnimatedRef.current = null;
    rotateAnimatedRef.current = null;
  }

  const buildStyles = useMemo(() => {
    let newStyle = null;
    if (type === 'message') {
      newStyle = {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      };
    } else {
      newStyle = {
        paddingTop: 22,
        paddingBottom: 17,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 125,
        maxWidth: '70%',
      };
    }
    return {
      style: [themeValue.style, styles.container, newStyle, style],
      titleStyle: [themeValue.titleStyle, styles.toastTitle, titleStyle],
      iconStyle: [themeValue.iconStyle, styles.toastIcon, iconStyle],
    };
  }, [type, themeValue, style, titleStyle, iconStyle]);

  return (
    <View style={buildStyles.style}>
      <MemoRenderIcon
        type={type}
        iconStyle={buildStyles.iconStyle}
        rotateAnimated={rotateAnimatedRef.current}
        successIcon={successIcon}
        failIcon={failIcon}
        warnIcon={warnIcon}
        loadingIcon={loadingIcon}
      />
      <RenderNode
        Component={Label}
        Node={title}
        title={title}
        style={buildStyles.titleStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastTitle: {},
  toastIcon: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },
});

ToastView.propTypes = {
  type: PropTypes.oneOf(['message', 'success', 'fail', 'warn', 'loading']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: Label.propTypes.style,
  iconStyle: Image.propTypes.style,
  successIcon: PropTypes.number,
  failIcon: PropTypes.number,
  warnIcon: PropTypes.number,
  loadingIcon: PropTypes.number,
};

ToastView.defaultProps = {
  type: 'message',
};

export default React.memo(ToastView);
