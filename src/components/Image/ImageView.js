'use strict';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Animated,
  Image,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

function RenderError(props) {
  const {
    onPress,
    opacityAnimated,
    errorStyle,
    errorImage,
    errorImageStyle,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.errorStyle,
          errorStyle,
          {
            opacity: opacityAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <Image
          style={[styles.errorImageStyle, errorImageStyle]}
          source={errorImage}
          resizeMode={'contain'}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

function RenderPlaceholder(props) {
  const {
    opacityAnimated,
    placeholderImage,
    placeholderImageStyle,
    placeholderStyle,
  } = props;

  return (
    <Animated.View
      style={[
        styles.placeholderStyle,
        placeholderStyle,
        {
          opacity: opacityAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}
    >
      <Image
        style={[styles.placeholderImageStyle, placeholderImageStyle]}
        source={placeholderImage}
        resizeMode={'contain'}
      />
    </Animated.View>
  );
}

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const MemoRenderPlaceholder = React.memo(RenderPlaceholder);
const MemoRenderRenderError = React.memo(RenderError);

function ImageView(props) {
  const {
    onProgress,
    onLoadStart,
    onLoad,
    onLoadEnd,
    onError,
    useGradient,
    maxImageWidth,
    style,
    source,
    placeholderImage,
    placeholderImageStyle,
    placeholderStyle,
    children,
    forwardedRef,
    resizeMode,
    tintColor,
    errorStyle,
    errorImage,
    errorImageStyle,
    onPressError,
    ...others
  } = props;

  const opacityRef = useRef(new Animated.Value(useGradient ? 0.0 : 1.0));
  const opacityPlaceholderRef = useRef(new Animated.Value(1.0));

  const [refreshCount, setRefreshCount] = useState(0);
  const [imageSize, setImageSize] = useState(null);
  const [error, setError] = useState(false);

  const onClickError = useCallback(
    (event) => {
      if (onPressError) {
        onPressError(event);
      } else {
        setError(false);
        setRefreshCount((pre) => pre + 1);
      }
    },
    [onPressError],
  );

  const onImageProgress = useCallback(
    (event) => {
      onProgress && onProgress(event);
    },
    [onProgress],
  );

  const onImageLoadStart = useCallback(
    (event) => {
      if (useGradient) {
        opacityRef.current.setValue(0.0);
      } else {
        opacityRef.current.setValue(1.0);
      }
      opacityPlaceholderRef.current.setValue(1.0);
      onLoadStart && onLoadStart(event);
    },
    [onLoadStart, useGradient],
  );

  const onImageLoadEnd = useCallback(
    (event) => {
      if (useGradient) {
        Animated.parallel([
          Animated.spring(opacityRef.current, {
            toValue: 1.0,
            useNativeDriver: true,
          }),
          Animated.spring(opacityPlaceholderRef.current, {
            toValue: 0.0,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        opacityRef.current.setValue(1.0);
        opacityPlaceholderRef.current.setValue(0.0);
      }
      onLoadEnd && onLoadEnd(event);
    },
    [onLoadEnd, useGradient],
  );

  const onImageLoad = useCallback(
    (event) => {
      let { width, height } = event.nativeEvent;
      if (maxImageWidth) {
        if (width >= maxImageWidth) {
          height = (maxImageWidth / width) * height;
          width = maxImageWidth;
        }
        setImageSize({ width, height });
      }
      onLoad && onLoad(event);
    },
    [maxImageWidth, onLoad],
  );

  const onImageError = useCallback(
    (event) => {
      setError(true);
      onError && onError(event);
    },
    [onError],
  );

  const newSource = useMemo(() => {
    if (
      source &&
      typeof source !== 'number' &&
      (source.uri === undefined || source.uri === null)
    ) {
      source.uri = '';
    }
    return { ...source };
  }, [source]);

  const buildStyles = useMemo(() => {
    const newStyles = StyleSheet.flatten(style ? style : {});
    return {
      style: [newStyles, styles.container, imageSize],
      resizeMode: newStyles.resizeMode || resizeMode,
      tintColor: newStyles.tintColor || tintColor,
    };
  }, [imageSize, resizeMode, style, tintColor]);

  if (typeof source === 'number') {
    return <Image {...props} ref={forwardedRef} style={buildStyles.style} />;
  }

  return (
    <View style={buildStyles.style}>
      {placeholderImage ? (
        <MemoRenderPlaceholder
          opacityAnimated={opacityPlaceholderRef.current}
          placeholderStyle={placeholderStyle}
          placeholderImage={placeholderImage}
          placeholderImageStyle={placeholderImageStyle}
        />
      ) : null}
      <AnimatedFastImage
        {...others}
        ref={forwardedRef}
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: opacityRef.current,
          },
        ]}
        source={{
          refreshCount: refreshCount,
          priority: FastImage.priority.low,
          ...newSource,
        }}
        onLoadStart={onImageLoadStart}
        onProgress={onImageProgress}
        onLoad={onImageLoad}
        onLoadEnd={onImageLoadEnd}
        onError={onImageError}
        resizeMode={buildStyles.resizeMode}
        tintColor={buildStyles.tintColor}
        fallback={false}
      />
      {children}
      {errorImage && error ? (
        <MemoRenderRenderError
          opacityAnimated={opacityRef.current}
          errorStyle={errorStyle}
          errorImage={errorImage}
          errorImageStyle={errorImageStyle}
          onPress={onClickError}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  placeholderStyle: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  placeholderImageStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  errorStyle: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  errorImageStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

ImageView.propTypes = {
  ...FastImage.propTypes,
  style: Image.propTypes.style,
  maxImageWidth: PropTypes.number,
  useGradient: PropTypes.bool,
  placeholderStyle: ViewPropTypes.style,
  placeholderImage: Image.propTypes.source,
  placeholderImageStyle: Image.propTypes.style,
  errorStyle: ViewPropTypes.style,
  errorImage: Image.propTypes.source,
  errorImageStyle: Image.propTypes.style,
  onPressError: PropTypes.func,
};

ImageView.defaultProps = {
  ...FastImage.defaultProps,
  useGradient: true,
};

export default React.memo(ImageView);
