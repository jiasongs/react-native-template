'use strict';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { View, StyleSheet, Animated, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const ImageStatus = {
  START: 'START', // 开始加载
  LOADING: 'LOADING', // 加载中
  END: 'END', // 结束加载
  ERROR: 'ERROR', // 加载错误
};

function RenderError(props) {
  const {
    imageStatus,
    placeholderImage,
    placeholderImageStyle,
    placeholderStyle,
  } = props;
  if (
    imageStatus === ImageStatus.START ||
    imageStatus === ImageStatus.LOADING
  ) {
    return (
      <View style={[styles.placeholderStyle, placeholderStyle]}>
        <Image
          style={[styles.placeholderImageStyle, placeholderImageStyle]}
          source={placeholderImage}
          resizeMode={'contain'}
        />
      </View>
    );
  }
  return null;
}

function RenderPlaceholder(props) {
  const {
    imageStatus,
    placeholderImage,
    placeholderImageStyle,
    placeholderStyle,
  } = props;
  if (
    imageStatus === ImageStatus.START ||
    imageStatus === ImageStatus.LOADING
  ) {
    return (
      <View style={[styles.placeholderStyle, placeholderStyle]}>
        <Image
          style={[styles.placeholderImageStyle, placeholderImageStyle]}
          source={placeholderImage}
          resizeMode={'contain'}
        />
      </View>
    );
  }
  return null;
}

function RenderOpacityMask(props) {
  const { imageStatus } = props;
  const opacityRef = useRef(new Animated.Value(1.0));

  useEffect(() => {
    const opacityAnimation = opacityRef.current;
    if (imageStatus === ImageStatus.END) {
      opacityRef.current.setValue(1.0);
      Animated.spring(opacityRef.current, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
    return () => {
      opacityAnimation.stopAnimation();
    };
  }, [imageStatus]);

  return (
    <Animated.View
      style={[styles.opacityMask, { opacity: opacityRef.current }]}
    />
  );
}

const MemoRenderPlaceholder = React.memo(RenderPlaceholder);
const MemoRenderOpacityMask = React.memo(RenderOpacityMask);
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
    ...others
  } = props;

  const _imageStatusRef = useRef(ImageStatus.START);

  const [imageSize, setImageSize] = useState(null);
  const [imageStatus, setImageStatus] = useState(ImageStatus.START);

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
      style: [newStyles, imageSize],
      resizeMode: newStyles.resizeMode || resizeMode,
      tintColor: newStyles.tintColor || tintColor,
    };
  }, [imageSize, resizeMode, style, tintColor]);

  if (typeof source === 'number') {
    return <Image {...props} ref={forwardedRef} style={buildStyles.style} />;
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
      tintColor={buildStyles.tintColor}
    >
      {/* {useGradient && <MemoRenderOpacityMask imageStatus={imageStatus} />} */}
      {placeholderImage ? (
        <MemoRenderPlaceholder
          imageStatus={imageStatus}
          placeholderStyle={placeholderStyle}
          placeholderImage={placeholderImage}
          placeholderImageStyle={placeholderImageStyle}
        />
      ) : null}
      {/* <MemoRenderRenderError /> */}
      {children}
    </FastImage>
  );
}

const styles = StyleSheet.create({
  placeholderStyle: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: -2,
  },
  placeholderImageStyle: {
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
  style: Image.propTypes.style,
  maxImageWidth: PropTypes.number,
  useGradient: PropTypes.bool,
  placeholderStyle: ViewPropTypes.style,
  placeholderImage: Image.propTypes.source,
  placeholderImageStyle: Image.propTypes.style,
  errorStyle: ViewPropTypes.style,
  errorImage: Image.propTypes.source,
  errorImageStyle: Image.propTypes.style,
};

ImageView.defaultProps = {
  ...FastImage.defaultProps,
  useGradient: true,
};

export default React.memo(ImageView);
