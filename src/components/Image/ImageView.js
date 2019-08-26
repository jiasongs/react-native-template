'use strict';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const ImageStatus = {
  START: 'START', // 开始加载
  LOADING: 'LOADING', // 加载中
  END: 'END', // 结束加载
  ERROR: 'ERROR', // 加载错误
};

function RenderPlaceholder(props) {
  const {
    maxImageWidth,
    imageStatus,
    placeholderImage,
    placeholderStyle,
  } = props;
  if (
    !maxImageWidth &&
    (imageStatus === ImageStatus.START || imageStatus === ImageStatus.LOADING)
  ) {
    return (
      <View style={styles.placeholderContainer}>
        <Image
          style={[styles.placeholderStyle, placeholderStyle]}
          source={placeholderImage}
          resizeMode={'contain'}
        />
      </View>
    );
  }
  return null;
}

function RenderOpacityMask(props) {
  const { maxImageWidth, useOpacity, opacity } = props;
  if (maxImageWidth && useOpacity) {
    return <Animated.View style={[styles.opacityMask, { opacity: opacity }]} />;
  }
  return null;
}

const MemoRenderPlaceholder = React.memo(RenderPlaceholder);
const MemoRenderOpacityMask = React.memo(RenderOpacityMask);

function ImageView(props) {
  const {
    onProgress,
    onLoadStart,
    onLoad,
    onLoadEnd,
    onError,
    useOpacity,
    maxImageWidth,
    style,
    source,
    placeholderImage,
    placeholderStyle,
    children,
    forwardedRef,
    ...others
  } = props;

  const _imageStatusRef = useRef(ImageStatus.START);
  const opacityRef = useRef(new Animated.Value(1.0));

  const [imageSize, setImageSize] = useState(null);
  const [imageStatus, setImageStatus] = useState(ImageStatus.START);

  function startOpacityAnimated() {
    opacityRef.current.setValue(1.0);
    Animated.timing(opacityRef.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {});
  }

  const onImageProgress = useCallback(
    (event) => {
      onProgress && onProgress(event);
    },
    [onProgress],
  );

  const onImageLoadStart = useCallback(
    (event) => {
      _imageStatusRef.current = ImageStatus.LOADING;
      setImageStatus(ImageStatus.LOADING);
      onLoadStart && onLoadStart(event);
    },
    [onLoadStart],
  );

  const onImageLoadEnd = useCallback(
    (event) => {
      _imageStatusRef.current = ImageStatus.END;
      setImageStatus(ImageStatus.END);
      onLoadEnd && onLoadEnd(event);
    },
    [onLoadEnd],
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
      _imageStatusRef.current = ImageStatus.ERROR;
      setImageStatus(ImageStatus.ERROR);
      onError && onError(event);
    },
    [onError],
  );

  useEffect(() => {
    const opacityAnimation = opacityRef.current;
    if (
      maxImageWidth &&
      useOpacity &&
      _imageStatusRef.current === ImageStatus.END
    ) {
      startOpacityAnimated();
    }
    return () => {
      opacityAnimation.stopAnimation();
    };
  }, [imageStatus, maxImageWidth, useOpacity]);

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
    return {
      style: [style, imageSize],
      resizeMode: StyleSheet.flatten(style).resizeMode,
    };
  }, [imageSize, style]);

  if (typeof source === 'number') {
    return <Image {...props} />;
  }

  return (
    <FastImage
      {...others}
      ref={forwardedRef}
      style={buildStyles.style}
      source={{ priority: FastImage.priority.low, ...newSource }}
      onLoadStart={onImageLoadStart}
      onProgress={onImageProgress}
      onLoad={onImageLoad}
      onLoadEnd={onImageLoadEnd}
      onError={onImageError}
      fallback={false}
      resizeMode={buildStyles.resizeMode}
    >
      <MemoRenderPlaceholder
        maxImageWidth={maxImageWidth}
        imageStatus={imageStatus}
        placeholderImage={placeholderImage}
        placeholderStyle={placeholderStyle}
      />
      <MemoRenderOpacityMask
        maxImageWidth={maxImageWidth}
        useOpacity={useOpacity}
        opacity={opacityRef.current}
      />
      {children}
    </FastImage>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2f4',
    zIndex: -2,
  },
  placeholderStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  opacityMask: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

ImageView.propTypes = {
  ...FastImage.propTypes,
  maxImageWidth: PropTypes.number,
  useOpacity: PropTypes.bool,
  placeholderImage: Image.propTypes.source,
  placeholderStyle: Image.propTypes.style,
};

ImageView.defaultProps = {
  ...FastImage.defaultProps,
  useOpacity: true,
};

export default React.memo(ImageView);
