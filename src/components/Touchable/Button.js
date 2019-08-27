'use strict';
import React, { useMemo, useRef, useCallback, useContext } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import ImageView from '../Image/ImageView';
import { ThemeContext } from '../../config/themes';

const IconPosition = {
  PositionTop: 'top',
  PositionLeft: 'left', // imageView在titleLabel左边
  PositionBottom: 'bottom', // imageView在titleLabel下面
  PositionRight: 'right',
};

function Button(props) {
  const {
    style,
    type,
    raised,
    icon,
    iconStyle,
    iconPosition,
    title,
    titleStyle,
    spacingIconAndTitle,
    backgroundImage,
    clickInterval,
    onPress,
    children,
    forwardedRef,
    disabled,
    disabledStyle,
    disabledTitleStyle,
    loading,
    loadingStyle,
    ...others
  } = props;

  const lastActionTimeRef = useRef(0);
  const themeValue = useContext(ThemeContext);

  const _onPress = useCallback(
    (event) => {
      const nowTime = new Date().getTime();
      if (nowTime - lastActionTimeRef.current <= clickInterval) {
        console.warn('间隔时间内重复点击了');
        return;
      }
      lastActionTimeRef.current = nowTime;
      onPress && onPress(event);
    },
    [clickInterval, onPress],
  );

  const buildStyles = useMemo(() => {
    const button = themeValue.button;
    const newStyle = [],
      newTitleStyle = [],
      newIconStyle = [],
      newLoadingStyle = [];
    if (type === 'solid') {
      newStyle.push(button.solid.style);
      newTitleStyle.push(button.solid.titleStyle);
      newIconStyle.push(button.solid.iconStyle);
      loading && newLoadingStyle.push(button.solid.loadingStyle);
      if (disabled) {
        newStyle.push(button.solid.disabledStyle);
        newTitleStyle.push(button.solid.disabledTitleStyle);
      }
    } else if (type === 'outline') {
      newStyle.push(button.outline.style);
      newTitleStyle.push(button.outline.titleStyle);
      newIconStyle.push(button.outline.iconStyle);
      loading && newLoadingStyle.push(button.outline.loadingStyle);
      if (disabled) {
        newStyle.push(button.outline.disabledStyle);
        newTitleStyle.push(button.outline.disabledTitleStyle);
      }
    } else if (type === 'clear') {
      newStyle.push(button.clear.style);
      newTitleStyle.push(button.clear.titleStyle);
      newIconStyle.push(button.clear.iconStyle);
      loading && newLoadingStyle.push(button.clear.loadingStyle);
      if (disabled) {
        newStyle.push(button.clear.disabledStyle);
        newTitleStyle.push(button.clear.disabledTitleStyle);
      }
    }
    if (type !== 'clear' && raised) {
      newStyle.push(button.raisedStyle);
      console.log('newStyle', newStyle);
    }
    const buildStyle = [...newStyle, styles.container];
    const buildTitleStyle = [...newTitleStyle, styles.titleStyle];
    const buildIconStyle = [...newIconStyle, styles.iconStyle];
    if (icon && title) {
      buildStyle.push({ alignItems: 'center' });
      switch (iconPosition) {
        case IconPosition.PositionTop:
          type !== 'clear' && buildStyle.push({ paddingVertical: 15 });
          buildIconStyle.push({
            marginBottom: spacingIconAndTitle,
            ...button.iconVerticalStyle,
          });
          break;
        case IconPosition.PositionBottom:
          type !== 'clear' && buildStyle.push({ paddingVertical: 15 });
          buildIconStyle.push({
            marginTop: spacingIconAndTitle,
            ...button.iconVerticalStyle,
          });
          break;
        case IconPosition.PositionLeft:
          buildStyle.push({ flexDirection: 'row' });
          buildIconStyle.push({
            marginRight: spacingIconAndTitle,
            ...button.iconHorizontalStyle,
          });
          break;
        case IconPosition.PositionRight:
          buildStyle.push({ flexDirection: 'row' });
          buildIconStyle.push({
            marginLeft: spacingIconAndTitle,
            ...button.iconHorizontalStyle,
          });
          break;
        default:
          break;
      }
    }
    return {
      style: [...buildStyle, style, disabled ? disabledStyle : null],
      iconStyle: [...buildIconStyle, iconStyle],
      titleStyle: [
        ...buildTitleStyle,
        titleStyle,
        disabled ? disabledTitleStyle : null,
      ],
      loadingStyle: [...newLoadingStyle, loadingStyle],
    };
  }, [
    disabled,
    disabledStyle,
    disabledTitleStyle,
    icon,
    iconPosition,
    iconStyle,
    loading,
    loadingStyle,
    raised,
    spacingIconAndTitle,
    style,
    themeValue.button,
    title,
    titleStyle,
    type,
  ]);

  const iconTopOrLeft = useMemo(() => {
    return (
      iconPosition === IconPosition.PositionLeft ||
      iconPosition === IconPosition.PositionTop
    );
  }, [iconPosition]);

  return (
    <TouchableOpacity
      {...others}
      ref={forwardedRef}
      style={buildStyles.style}
      onPress={_onPress}
      disabled={loading || disabled}
    >
      {backgroundImage && (
        <ImageBackground
          style={styles.imageBackground}
          source={backgroundImage}
        />
      )}
      {icon && iconTopOrLeft && (
        <ImageView style={buildStyles.iconStyle} source={icon} />
      )}
      {title && <Text style={buildStyles.titleStyle}>{title}</Text>}
      {icon && !iconTopOrLeft && (
        <ImageView style={buildStyles.iconStyle} source={icon} />
      )}
      {children}
      {loading && (
        <ActivityIndicator
          style={buildStyles.loadingStyle}
          color={StyleSheet.flatten(buildStyles.loadingStyle).color}
          size={StyleSheet.flatten(buildStyles.loadingStyle).size}
          animating={loading}
          hidesWhenStopped={true}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    resizeMode: 'contain',
  },
  titleStyle: {},
  imageBackground: {
    ...StyleSheet.absoluteFillObject,
  },
});

Button.propTypes = {
  forwardedRef: PropTypes.any,
  type: PropTypes.oneOf(['solid', 'clear', 'outline']),
  icon: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  iconStyle: Image.propTypes.style,
  iconPosition: PropTypes.oneOf([
    IconPosition.PositionTop,
    IconPosition.PositionLeft,
    IconPosition.PositionBottom,
    IconPosition.PositionRight,
  ]),
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  spacingIconAndTitle: PropTypes.number,
  backgroundImage: PropTypes.number,
  activeOpacity: PropTypes.number,
  onPress: PropTypes.func,
  onPressOut: PropTypes.func,
  onLongPress: PropTypes.func,
  delayLongPress: PropTypes.number,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  disabledTitleStyle: Text.propTypes.style,
  loading: PropTypes.bool,
  loadingStyle: ViewPropTypes.style,
  raised: PropTypes.bool,
  hitSlop: ViewPropTypes.hitSlop,
  clickInterval: PropTypes.number, // 多次点击之间的延迟
};

Button.defaultProps = {
  ...TouchableOpacity.defaultProps,
  type: 'solid',
  iconPosition: IconPosition.PositionLeft,
  spacingIconAndTitle: 8,
  activeOpacity: 0.8,
  clickInterval: 300,
  hitSlop: { top: 10, left: 10, bottom: 10, right: 10 },
  raised: false,
};

export default React.memo(Button);
