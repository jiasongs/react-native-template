'use strict';
import React, { useRef, useEffect, useMemo, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../config/themes';

function RenderIcon(props) {
  const {
    type,
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
        style={[styles.loadingImage, { transform: [{ rotate }] }]}
        resizeMode={'contain'}
        source={source}
      />
    );
  }
  return null;
}

function RenderText(props) {
  const { text, titleStyle } = props;
  if (typeof text === 'string') {
    return (
      <Text style={[styles.toastText, titleStyle]}>{text}</Text>
    );
  } else if (React.isValidElement(text)) {
    return text;
  }
  return null;
}

const MemoRenderIcon = React.memo(RenderIcon);
const MemoRenderText = React.memo(RenderText);

function ToastView(props) {
  const {
    type,
    text,
    successIcon,
    failIcon,
    warnIcon,
    loadingIcon,
  } = props;

  const rotateAnimatedRef = useRef(new Animated.Value(0));
  const loopAnimatedRef = useRef(null);
  const themeValue = useContext(ThemeContext);

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
      useNativeDriver: true
    });
    loopAnimatedRef.current = Animated.loop(timingAnimated, { iterations: -1 });
    loopAnimatedRef.current.start(() => {

    });
  }

  function stopRotateAnimated() {
    loopAnimatedRef.current.stop();
    rotateAnimatedRef.current.stopAnimation();
    loopAnimatedRef.current = null;
    rotateAnimatedRef.current = null;
  }

  const buildStyles = useMemo(() => {
    const toast = themeValue.toast;
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
      style: [toast.style, styles.container, newStyle],
      titleStyle: [toast.textStyle]
    };
  }, [type, themeValue]);

  return (
    <View style={buildStyles.style}>
      <MemoRenderIcon
        type={type}
        rotateAnimated={rotateAnimatedRef.current}
        successIcon={successIcon}
        failIcon={failIcon}
        warnIcon={warnIcon}
        loadingIcon={loadingIcon}
      />
      <MemoRenderText text={text} titleStyle={buildStyles.titleStyle} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '70%',
  },
  loadingImage: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },
  toastText: {
    lineHeight: 20
  }
});

ToastView.propTypes = {
  type: PropTypes.oneOf(['message', 'success', 'fail', 'warn', 'loading']),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  successIcon: PropTypes.number,
  failIcon: PropTypes.number,
  warnIcon: PropTypes.number,
  loadingIcon: PropTypes.number,
};

ToastView.defaultProps = {
  type: 'message'
};

export default React.memo(ToastView);
